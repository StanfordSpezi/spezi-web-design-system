import { type ComponentProps, useState } from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import {
  Dialog,
  DialogContentElement,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/Dialog";
import { SideLabel, type SideLabelProps } from "@/components/SideLabel";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import { cn } from "@/utils/className";
import { ConsentDialogContext, useConsentDialog } from "./ConsentDialogContext";

/**
 * Extends Dialog props but omits onOpenChange to prevent closing.
 */
interface ConsentDialogProps
  extends Omit<ComponentProps<typeof Dialog>, "onOpenChange"> {}

/**
 * A dialog component that requires explicit consent before proceeding.
 * The dialog cannot be closed until the consent checkbox is checked.
 *
 * Create your own component out of primitive components.
 *
 * If you're creating app-wise consent, Render it at the root of your router to ensure the user has provided consent.
 *
 * @example
 * ```tsx
 * <ConsentDialog open={userDidntAgreeToTermsAndConditionsYet}>
 *   <DialogHeader>
 *     <DialogTitle>Terms and Conditions</DialogTitle>
 *     <DialogDescription>Please read and accept the terms</DialogDescription>
 *   </DialogHeader>
 *   <ConsentDialogContent>
 *     <p>Terms content...</p>
 *   </ConsentDialogContent>
 *   <ConsentDialogCheckbox label="I agree to the terms" />
 *   <ConsentDialogSubmit onClick={handleAcceptConsent}>Accept</ConsentDialogSubmit>
 * </ConsentDialog>
 * ```
 */
export const ConsentDialog = ({ children, ...props }: ConsentDialogProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ConsentDialogContext.Provider value={{ isChecked, setIsChecked }}>
      <Dialog {...props}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContentElement>{children}</DialogContentElement>
        </DialogPortal>
      </Dialog>
    </ConsentDialogContext.Provider>
  );
};

interface ConsentDialogContentProps extends ComponentProps<"div"> {}

/**
 * A scrollable container for dialog content.
 * Useful for displaying long text like terms and conditions.
 *
 * @example
 * ```tsx
 * <ConsentDialogContent>
 *   <p>Long terms and conditions text...</p>
 * </ConsentDialogContent>
 * ```
 */
export const ConsentDialogContent = ({
  children,
  className,
  ...props
}: ConsentDialogContentProps) => (
  <div
    className={cn(
      "max-h-[60vh] overflow-y-auto rounded-md border p-4",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface ConsentDialogCheckboxProps
  extends ComponentProps<typeof Checkbox>,
    Pick<SideLabelProps, "label"> {}

/**
 * A checkbox component that controls the consent state.
 *
 * @example
 * ```tsx
 * <ConsentDialogCheckbox label="I agree to the terms and conditions" />
 * ```
 */
export const ConsentDialogCheckbox = ({
  label,
  ...props
}: ConsentDialogCheckboxProps) => {
  const { isChecked, setIsChecked } = useConsentDialog();

  return (
    <SideLabel label={label}>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked as boolean)}
        {...props}
      />
    </SideLabel>
  );
};

interface ConsentDialogSubmitProps
  extends ComponentProps<typeof Button>,
    Pick<TooltipProps, "tooltip"> {}

/**
 * A submit button that is disabled until consent is given.
 *
 * @example
 * ```tsx
 * <ConsentDialogSubmit onClick={handleSubmit}>Accept Terms</ConsentDialogSubmit>
 * ```
 */
export const ConsentDialogSubmit = ({
  tooltip = "Please check the consent to proceed",
  className,
  ...props
}: ConsentDialogSubmitProps) => {
  const { isChecked } = useConsentDialog();

  return (
    <DialogFooter>
      <Tooltip tooltip={tooltip} open={isChecked ? false : undefined}>
        <Button
          disabled={!isChecked}
          className={cn("disabled:pointer-events-auto", className)}
          {...props}
        />
      </Tooltip>
    </DialogFooter>
  );
};

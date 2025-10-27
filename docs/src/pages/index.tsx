"use client";

import {
  Github,
  BookOpen,
  Sparkles,
  Target,
  Zap,
  Accessibility,
  Lock,
  Package,
  CheckCircle2,
} from "lucide-react";
import styles from "./index.module.css";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const features = [
  {
    icon: Target,
    title: "Opinionated Defaults",
    description:
      "Sensible choices made for you, accelerating development without decision fatigue.",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description:
      "Built on Radix UI, Tailwind CSS v4, TypeScript, and React 19 and other well-known open source libraries.",
  },
  {
    icon: Package,
    title: "Feature-Rich",
    description:
      "Comprehensive library including form handling, navigation, application shell, utilities and more.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "WCAG-compliant components with keyboard navigation and screen reader support.",
  },
  {
    icon: Lock,
    title: "Type-Safe",
    description: "Full TypeScript coverage with strict typing for enhanced DX.",
  },
  {
    icon: CheckCircle2,
    title: "Well-Tested",
    description:
      "High test coverage and usage across Stanford projects ensuring reliability in production.",
  },
];

const projects = [
  {
    title: "ENGAGE-HF Web Frontend",
    description: "Heart failure management platform",
    url: "https://github.com/StanfordBDHG/ENGAGE-HF-Web-Frontend",
  },
  {
    title: "Spezi Web Study Platform",
    description: "Research study management system",
    url: "https://github.com/StanfordSpezi/spezi-web-study-platform",
  },
  {
    title: "RadGPT",
    description: "AI-powered radiology assistance tool",
    url: "https://github.com/StanfordBDHG/RadGPT",
  },
];

const packages = [
  {
    title: "spezi-web-configurations",
    description:
      "Shared ESLint, Prettier, and TypeScript configurations used across Spezi Web projects.",
    buttonText: "View Package",
    url: "https://github.com/StanfordSpezi/spezi-web-configurations",
  },
  {
    title: "spezi-web-template-application",
    description:
      "Complete application template combining all Spezi Web packages for rapid bootstrapping.",
    buttonText: "View Template",
    url: "https://github.com/StanfordSpezi/spezi-web-template-application",
  },
];

export const Landing = () => (
  <Layout>
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles className={styles.badgeIcon} />
            <span>Batteries-included app building kit</span>
          </div>
          <h1 className={styles.title}>Spezi Web Design System</h1>
          <p className={styles.subtitle}>
            An opinionated, feature-rich frontend toolset for rapid application
            development.
          </p>
          <p className={styles.description}>
            Built on modern standards with sensible defaults, yet with escape
            hatches. You build what matters for your users, we handle the rest.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.primaryButton} href="/docs/why-spezi">
              <BookOpen className={styles.buttonIcon} />
              Docs
            </Link>
            <Link
              href="https://spezi.health/spezi-web-design-system/storybook"
              className={styles.secondaryButton}
            >
              <svg
                width="20"
                height="20"
                viewBox="-31.5 0 319 319"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "0.25rem", verticalAlign: "text-bottom" }}
              >
                <defs>
                  <path
                    d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z"
                    id="path-1"
                  />
                </defs>
                <g>
                  <mask id="mask-2" fill="white">
                    <use href="#path-1"></use>
                  </mask>
                  <use
                    fill="currentColor"
                    fill-rule="nonzero"
                    href="#path-1"
                  ></use>
                  <path
                    d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z"
                    fill="var(--bg)"
                    fill-rule="nonzero"
                    mask="url(#mask-2)"
                  />
                </g>
              </svg>
              Storybook
            </Link>
            <Link
              href="https://github.com/StanfordSpezi/spezi-web-design-system"
              className={styles.secondaryButton}
            >
              <Github className={styles.buttonIcon} />
              GitHub
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.decorativeOrb1} />
      <div className={styles.decorativeOrb2} />
    </section>
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>Key Features</h2>
            <p className={styles.featuresSubtitle}>
              Everything you need to build modern, accessible web applications
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.iconWrapper}>
                    <Icon className={styles.featureIcon} />
                  </div>
                  <h3 className={styles.featureCardTitle}>{feature.title}</h3>
                  <p className={styles.featureCardDescription}>
                    {feature.description}
                  </p>
                  <div className={styles.cardGradient} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    <section className={styles.productionSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Used in Production</h2>
          <p className={styles.sectionSubtitle}>
            Real-world Stanford projects using this library
          </p>
          <div className={styles.productionGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.productionCard}>
                <h3 className={styles.productionCardTitle}>{project.title}</h3>
                <p className={styles.productionCardDescription}>
                  {project.description}
                </p>
                <Link href={project.url} className={styles.productionButton}>
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className={styles.ecosystemSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>
            Part of the Spezi Web Ecosystem
          </h2>
          <div className={styles.ecosystemGrid}>
            {packages.map((pkg, index) => (
              <div key={index} className={styles.ecosystemCard}>
                <h3 className={styles.ecosystemCardTitle}>{pkg.title}</h3>
                <p className={styles.ecosystemCardDescription}>
                  {pkg.description}
                </p>
                <Link href={pkg.url} className={styles.ecosystemButton}>
                  {pkg.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className={styles.actionsSection}>
      <div className={styles.container}>
        <div className={styles.actionsContent}>
          <h2 className={styles.actionsTitle}>
            Ready to Build Something Amazing?
          </h2>
          <p className={styles.actionsSubtitle}>
            Choose your path to get started with Spezi Web Design System
          </p>
          <div className={styles.actionsGrid}>
            <div className={styles.actionCard}>
              <div className={styles.actionIconWrapper}>
                <BookOpen className={styles.actionIcon} />
              </div>
              <h3 className={styles.actionCardTitle}>
                Explore the Documentation
              </h3>
              <p className={styles.actionCardDescription}>
                Dive into comprehensive guides, API references, and examples to
                learn everything about our components and utilities.
              </p>
              <Link
                href="/docs/getting-started"
                className={styles.actionCardButton}
              >
                Browse Documentation
                <svg
                  className={styles.actionArrow}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className={styles.actionCard}>
              <div className={styles.actionIconWrapper}>
                <Zap className={styles.actionIcon} />
              </div>
              <h3 className={styles.actionCardTitle}>Start with Template</h3>
              <p className={styles.actionCardDescription}>
                Jump right in with our complete application template. Everything
                configured and ready to go in seconds.
              </p>
              <Link
                href="https://github.com/StanfordSpezi/spezi-web-template-application"
                className={styles.actionCardButton}
              >
                Use Template Application
                <svg
                  className={styles.actionArrow}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Landing;

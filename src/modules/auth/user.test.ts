import { getUserName } from '@/modules/auth/user'

describe('user', () => {
  describe('getUserName', () => {
    const johnUser = {
      displayName: 'John Doe',
      email: 'john@example.com',
      uid: '1234-5678',
    }

    it('gets user name if defined', () => {
      expect(getUserName(johnUser)).toBe(johnUser.displayName)
    })

    it('gets email if defined', () => {
      expect(
        getUserName({
          ...johnUser,
          displayName: null,
        }),
      ).toBe(johnUser.email)
    })

    it('gets uid if defined', () => {
      expect(
        getUserName({
          ...johnUser,
          displayName: null,
          email: null,
        }),
      ).toBe(johnUser.uid)
    })

    it('responds with undefined or null if no property', () => {
      expect(getUserName({})).toBe(undefined)
      expect(getUserName({ uid: null })).toBe(null)
    })
  })
})

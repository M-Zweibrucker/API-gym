export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('User already checked in today')
  }
}

export class LateCheckInValidationError extends Error {
  constructor() {
    super('This check-in is late and cannot be validated')
    this.name = 'LateCheckInValidationError'
  }
}

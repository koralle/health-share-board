type Field = string

class AppError extends Error {
  public field: Field[]

  constructor(message: string, public _field: Field[]) {
    super(message)
    this.field = _field
  }
}

class EndUserError extends AppError {
  constructor(message: string, field: Field[]) {
    super(message, field)
  }
}

export { AppError, EndUserError }

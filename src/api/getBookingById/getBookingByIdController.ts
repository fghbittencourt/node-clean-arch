
export default class GetBookingByIdController
  implements ExpressController
{
  validations = [
    check('bookingId')
      .isUUID()
      .withMessage('Value must be an uuid')
  ];

  handle = async (req: Request, res: Response): Promise<void> => {
    // Valida schema do input do controller
    if (!validator.isValid()) {
      res.status(HTTPStatus.BAD_REQUEST).send(schemaErrors.array());
      return;
    }

    try {
      const input = { bookingId: req.params.bookingId };

      // Sync Use Case
      const output = await this.useCase.execute(input);

      res.send(output);
      
    } catch (err) {
        Logger.error(formatUseCaseOnError(this.useCase, err));

        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  };
}

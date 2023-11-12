class AllreadyExistsUrlError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AllreadyExistsUrlError';
  }
}

export default AllreadyExistsUrlError;

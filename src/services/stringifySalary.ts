export const stringifySalary = (salaryFrom: number, salaryTo: number, currency: string) => {
  if (salaryFrom === 0 && salaryTo === 0) {
    return 'з/п по договоренности';
  }
  if (salaryFrom === salaryTo) {
    return `з/п ${salaryFrom} ${currency}`;
  }
  if (salaryFrom !== 0 && salaryTo === 0) {
    return `з/п от ${salaryFrom} ${currency}`;
  }
  if (salaryFrom === 0 && salaryTo !== 0) {
    return `з/п до ${salaryTo} ${currency}`;
  }
  if (salaryFrom !== 0 && salaryTo !== 0) {
    return `з/п ${salaryFrom} - ${salaryTo} ${currency}`;
  }
};

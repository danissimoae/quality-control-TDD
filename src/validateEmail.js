const MAX_TOTAL_LENGTH = 254;
const MAX_LOCAL_LENGTH = 64;

const LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;
const TLD = /^[A-Za-z]{2,}$/;

export const validateEmail = (email) => {
  if (typeof email !== 'string' || email.length === 0 || email.length > MAX_TOTAL_LENGTH) {
    return false;
  }

  const atIndex = email.indexOf('@');
  if (atIndex === -1 || atIndex !== email.lastIndexOf('@')) {
    return false;
  }

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (local.length === 0 || local.length > MAX_LOCAL_LENGTH || !LOCAL_PART.test(local)) {
    return false;
  }

  const labels = domain.split('.');
  if (labels.length < 2) {
    return false;
  }
  if (!labels.every((label) => DOMAIN_LABEL.test(label))) {
    return false;
  }

  return TLD.test(labels[labels.length - 1]);
};

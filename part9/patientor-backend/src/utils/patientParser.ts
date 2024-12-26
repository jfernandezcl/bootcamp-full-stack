import { Gender, NewPatient } from '../types/types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Invalid or missing date of birth');
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing SSN');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid input data');
  }

  const newPatient: NewPatient = {
    name: parseName((object as { name: unknown }).name),
    dateOfBirth: parseDateOfBirth((object as { dateOfBirth: unknown }).dateOfBirth),
    ssn: parseSSN((object as { ssn: unknown }).ssn),
    gender: parseGender((object as { gender: unknown }).gender),
    occupation: parseOccupation((object as { occupation: unknown }).occupation),
  };

  return newPatient;
};

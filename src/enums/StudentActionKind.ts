/**
 * The available actions for the student dispatch function
 * @property SET_STUDENTS - The action to set students
 * @property SKIP - The action to skip the current student
 * @property SATISFIED - The action to give the current student a satisfied response
 * @property DISSATISFIED - The action to give the current student a dissatisfied response
 */
export enum StudentActionKind {
  SET_STUDENTS = 'SET_STUDENTS',
  SKIP = 'SKIP',
  SATISFIED = 'SATISFIED',
  DISSATISFIED = 'DISSATISFIED'
}

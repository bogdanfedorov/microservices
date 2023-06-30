interface WorkingHours {
  /**
   * @format date-time
   */
  from: Date
  /**
   * @format date-time
   */
  to: Date
}

interface WorkingHoursPerDay {
  /**
   * @minItems 0
   * @maxItems 2
   */
  monday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  tuesday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  wednesday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  thursday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  friday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  saturday: WorkingHours[]
  /**
   * @minItems 0
   * @maxItems 2
   */
  sunday: WorkingHours[]
}

interface IDoctor {
  /**
   * @format uuid
   */
  id: string
  name: string
  speciality: string
  workingHours: WorkingHoursPerDay
}

export { IDoctor }

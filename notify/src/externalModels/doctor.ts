interface WorkingHours {
  from: Date
  to: Date
}

interface WorkingHoursPerDay {
  monday: WorkingHours[]
  tuesday: WorkingHours[]
  wednesday: WorkingHours[]
  thursday: WorkingHours[]
  friday: WorkingHours[]
  saturday: WorkingHours[]
  sunday: WorkingHours[]
}

export default interface IDoctor {
  /**
   * @format uuid
   */
  id: string
  name: string
  speciality: string
  workingHours: WorkingHoursPerDay
}

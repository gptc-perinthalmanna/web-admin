export interface ProgramApiIn {
  title: string;
  duration: string;
  date: string;
  logos: string[];
  staffs: ProgramStaff[];
  holders: ProgramCertHolder[];
}

export interface ProgramStaff {
  id: string;
  name: string;
  designation: string;
  institution: string;
}

export interface ProgramCertHolder {
  name: string;
  phone: number;
  designation: string;
}

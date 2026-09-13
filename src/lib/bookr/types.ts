export interface BookrService {
  id: string;
  name: string;
  durationMin: number;
  price: number;
}

export interface BookrSlot {
  /** ISO 8601 start, clinic timezone */
  start: string;
  end: string;
  providerId?: string;
}

export interface CreateAppointmentInput {
  serviceId: string;
  start: string;
  client: {
    name: string;
    phone: string;
    email?: string;
  };
  notes?: string;
  locale?: "pt" | "en";
}

export interface BookrAppointment {
  id: string;
  reference: string;
  serviceId: string;
  start: string;
  end: string;
  status: "pending" | "confirmed";
}

export interface BookrAdapter {
  listServices(): Promise<BookrService[]>;
  findAvailableSlots(serviceId: string, dateISO: string): Promise<BookrSlot[]>;
  createAppointment(input: CreateAppointmentInput): Promise<BookrAppointment>;
  readonly mode: "mock" | "live";
}

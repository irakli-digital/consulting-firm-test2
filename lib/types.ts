export type Locale = "en" | "ka";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    services: string;
    howItWorks: string;
    guides: string;
    testimonials: string;
    faq: string;
    contact: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  trustBar: {
    clients: string;
    years: string;
    successRate: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
  permitGuides: {
    title: string;
    subtitle: string;
    guides: Array<{
      title: string;
      what: string;
      who: string;
      docs: string;
      timeline: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      quote: string;
      name: string;
      role: string;
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  form: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    permitType: string;
    permitOptions: string[];
    description: string;
    privacy: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    validation: {
      firstNameRequired: string;
      lastNameRequired: string;
      emailInvalid: string;
      mobileInvalid: string;
      privacyRequired: string;
    };
  };
  footer: {
    tagline: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    rights: string;
  };
}

export interface FormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
}

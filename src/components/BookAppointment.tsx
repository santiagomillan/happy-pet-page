import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dog,
  Cat,
  PawPrint,
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PetType = "dog" | "cat" | "other" | null;
type ServiceType =
  | "checkup"
  | "vaccination"
  | "grooming"
  | "surgery"
  | "emergency"
  | null;

interface FormData {
  ownerName: string;
  petName: string;
  email: string;
  phone: string;
  notes: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const petTypes = [
  { id: "dog", label: "Dog", icon: Dog },
  { id: "cat", label: "Cat", icon: Cat },
  { id: "other", label: "Other", icon: PawPrint },
];

const serviceTypes = [
  {
    id: "checkup",
    label: "General Checkup",
    icon: Stethoscope,
    description: "Routine health examination",
  },
  {
    id: "vaccination",
    label: "Vaccination",
    icon: Syringe,
    description: "Immunization services",
  },
  {
    id: "grooming",
    label: "Grooming",
    icon: Scissors,
    description: "Professional pet grooming",
  },
  {
    id: "surgery",
    label: "Surgery",
    icon: Heart,
    description: "Surgical procedures",
  },
  {
    id: "emergency",
    label: "Emergency Care",
    icon: Heart,
    description: "Urgent medical attention",
  },
];

const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: false },
  { time: "05:00 PM", available: true },
];

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [petType, setPetType] = useState<PetType>(null);
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    petName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 5;

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner's name is required";
    if (!formData.petName.trim()) newErrors.petName = "Pet's name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !petType) return;
    if (currentStep === 2 && !serviceType) return;
    if (currentStep === 3 && !validateForm()) return;
    if (currentStep === 4 && (!selectedDate || !selectedTime)) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return petType !== null;
    if (currentStep === 2) return serviceType !== null;
    if (currentStep === 3)
      return (
        formData.ownerName &&
        formData.petName &&
        formData.email &&
        formData.phone
      );
    if (currentStep === 4) return selectedDate && selectedTime;
    return true;
  };

  return (
    <section
      id="booking"
      className="py-20 bg-gradient-to-br from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 ">
              Book an Appointment
            </h2>
            <p className="text-lg text-muted-foreground">
              Schedule a visit for your beloved pet in just a few steps
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      currentStep >= step
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span className="text-xs mt-2 text-center hidden sm:block">
                    {step === 1 && "Pet Type"}
                    {step === 2 && "Service"}
                    {step === 3 && "Details"}
                    {step === 4 && "Date & Time"}
                    {step === 5 && "Confirm"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12 min-h-[500px] flex flex-col">
            {/* Step 1: Select Pet Type */}
            {currentStep === 1 && (
              <div className="flex-1 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Select Your Pet Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {petTypes.map((pet) => {
                    const Icon = pet.icon;
                    return (
                      <button
                        key={pet.id}
                        onClick={() => setPetType(pet.id as PetType)}
                        className={cn(
                          "p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105",
                          petType === pet.id
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className="w-12 h-12 mx-auto mb-3 text-primary" />
                        <p className="font-semibold text-lg">{pet.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Select Service Type */}
            {currentStep === 2 && (
              <div className="flex-1 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Choose a Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() =>
                          setServiceType(service.id as ServiceType)
                        }
                        className={cn(
                          "p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left",
                          serviceType === service.id
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className="w-10 h-10 mb-3 text-primary" />
                        <p className="font-semibold text-lg mb-1">
                          {service.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Appointment Form */}
            {currentStep === 3 && (
              <div className="flex-1 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Your Information
                </h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="ownerName">Owner's Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) =>
                          handleFormChange("ownerName", e.target.value)
                        }
                        placeholder="John Doe"
                        className={cn(errors.ownerName && "border-destructive")}
                      />
                      {errors.ownerName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.ownerName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="petName">Pet's Name *</Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) =>
                          handleFormChange("petName", e.target.value)
                        }
                        placeholder="Max"
                        className={cn(errors.petName && "border-destructive")}
                      />
                      {errors.petName && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.petName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className={cn(errors.email && "border-destructive")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleFormChange("phone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                        className={cn(errors.phone && "border-destructive")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        handleFormChange("notes", e.target.value)
                      }
                      placeholder="Any special requests or information we should know..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Select Date & Time */}
            {currentStep === 4 && (
              <div className="flex-1 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Choose Date & Time
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-3 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                      className="rounded-lg border border-border"
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">Available Time Slots</Label>
                    {!selectedDate ? (
                      <p className="text-muted-foreground text-sm">
                        Please select a date first
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() =>
                              slot.available && setSelectedTime(slot.time)
                            }
                            disabled={!slot.available}
                            className={cn(
                              "p-3 rounded-lg border-2 transition-all duration-200 font-medium",
                              !slot.available &&
                                "opacity-50 cursor-not-allowed bg-muted",
                              slot.available &&
                                selectedTime !== slot.time &&
                                "border-border hover:border-primary/50 hover:bg-primary/5",
                              selectedTime === slot.time &&
                                "border-primary bg-primary/10 shadow-md"
                            )}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="flex-1 animate-fade-in flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  Appointment Confirmed!
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for booking with us. We'll send a confirmation email
                  shortly.
                </p>

                <div className="w-full max-w-md bg-muted/50 rounded-xl p-6 text-left space-y-3">
                  <h4 className="font-semibold text-lg mb-4">
                    Appointment Details:
                  </h4>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pet Type:</span>
                    <span className="font-medium capitalize">{petType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">
                      {serviceTypes.find((s) => s.id === serviceType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pet Name:</span>
                    <span className="font-medium">{formData.petName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setPetType(null);
                    setServiceType(null);
                    setFormData({
                      ownerName: "",
                      petName: "",
                      email: "",
                      phone: "",
                      notes: "",
                    });
                    setSelectedDate(undefined);
                    setSelectedTime(null);
                  }}
                  className="mt-8"
                >
                  Book Another Appointment
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  {currentStep === 4 ? "Confirm" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;

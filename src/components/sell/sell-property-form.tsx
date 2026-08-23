"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

const sellSchema = z.object({
  name: z.string().min(2, "कृपया आफ्नो नाम लेख्नुहोस् / Please enter your name"),
  phone: z.string().min(8, "कृपया सही फोन नम्बर लेख्नुहोस् / Please enter a valid phone number"),
  email: z.email("कृपया सही इमेल लेख्नुहोस् / Please enter a valid email"),
  propertyType: z.enum(["house", "land"]),
  location: z.string().min(3, "कृपया सम्पत्तिको ठेगाना लेख्नुहोस् / Please add the property location"),
  area: z.string().min(1, "कृपया जग्गाको क्षेत्रफल लेख्नुहोस् / Please add the land area"),
  expectedPrice: z.string().min(1, "कृपया अपेक्षित मूल्य लेख्नुहोस् / Please add your expected price"),
  details: z.string().min(10, "कृपया सम्पत्तिबारे थप विवरण दिनुहोस् / Please share more details"),
});

type SellFormValues = z.infer<typeof sellSchema>;

export function SellPropertyForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: { propertyType: "house" },
  });

  const onSubmit = (values: SellFormValues) => {
    const nepaliType = values.propertyType === "house" ? "घर" : "जग्गा";
    const subject = `सम्पत्ति सूची अनुरोध / Property listing — ${nepaliType}, ${values.location}`;
    const body = [
      "नमस्कार GharJagga टोली, / Hello GharJagga team,",
      "",
      "म मेरो सम्पत्ति सूचीबद्ध गर्न चाहन्छु। / I would like to list my property.",
      "",
      `नाम / Name: ${values.name}`,
      `फोन / Phone: ${values.phone}`,
      `इमेल / Email: ${values.email}`,
      `सम्पत्तिको प्रकार / Property type: ${nepaliType} / ${values.propertyType}`,
      `ठेगाना / Location: ${values.location}`,
      `क्षेत्रफल / Area: ${values.area}`,
      `अपेक्षित मूल्य / Expected price: ${values.expectedPrice}`,
      "",
      "विवरण / Details:",
      values.details,
    ].join("\n");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.salesEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="sell-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-grid">
        <div className="form-field">
          <Label className="bilingual-label" htmlFor="name">तपाईंको नाम <span>/ Your name</span></Label>
          <Input id="name" placeholder="सुमन श्रेष्ठ / Suman Shrestha" {...register("name")} aria-invalid={Boolean(errors.name)} />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>
        <div className="form-field">
          <Label className="bilingual-label" htmlFor="phone">फोन नम्बर <span>/ Phone number</span></Label>
          <Input id="phone" placeholder="98XXXXXXXX" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <span className="field-error">{errors.phone.message}</span>}
        </div>
        <div className="form-field">
          <Label className="bilingual-label" htmlFor="email">इमेल <span>/ Email</span></Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>
        <div className="form-field">
          <Label className="bilingual-label">सम्पत्तिको प्रकार <span>/ Property type</span></Label>
          <Select defaultValue="house" onValueChange={(value) => value && setValue("propertyType", value as "house" | "land", { shouldValidate: true })}>
            <SelectTrigger className="form-select"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="house">घर / House</SelectItem><SelectItem value="land">जग्गा / Land</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="form-field">
          <Label className="bilingual-label" htmlFor="location">सम्पत्तिको ठेगाना <span>/ Property location</span></Label>
          <Input id="location" placeholder="टोल, पालिका, जिल्ला / Tole, municipality, district" {...register("location")} aria-invalid={Boolean(errors.location)} />
          {errors.location && <span className="field-error">{errors.location.message}</span>}
        </div>
        <div className="form-field">
          <Label className="bilingual-label" htmlFor="area">जग्गाको क्षेत्रफल <span>/ Land area</span></Label>
          <Input id="area" placeholder="जस्तै: ४ आना वा १० धुर / e.g. 4 aana or 10 dhur" {...register("area")} aria-invalid={Boolean(errors.area)} />
          {errors.area && <span className="field-error">{errors.area.message}</span>}
        </div>
        <div className="form-field field-full">
          <Label className="bilingual-label" htmlFor="expectedPrice">अपेक्षित मूल्य <span>/ Expected price</span></Label>
          <Input id="expectedPrice" placeholder="जस्तै: रु. २.५ करोड / e.g. Rs. 2.5 Cr" {...register("expectedPrice")} aria-invalid={Boolean(errors.expectedPrice)} />
          {errors.expectedPrice && <span className="field-error">{errors.expectedPrice.message}</span>}
        </div>
        <div className="form-field field-full">
          <Label className="bilingual-label" htmlFor="details">सम्पत्तिबारे विवरण <span>/ Property details</span></Label>
          <Textarea id="details" rows={4} placeholder="बाटो, मोहडा, कोठा, नजिकको स्थान, कागजात… / Road, facing, rooms, landmarks, documents…" {...register("details")} aria-invalid={Boolean(errors.details)} />
          {errors.details && <span className="field-error">{errors.details.message}</span>}
        </div>
      </div>
      <Button className="sell-submit" size="lg" type="submit" disabled={isSubmitting}>
        <Send aria-hidden="true" /> Gmail मा पठाउनुहोस् <span>/ Open in Gmail</span>
      </Button>
      <p className="form-privacy"><Mail aria-hidden="true" /> तपाईंको विवरण Gmail मा खुल्छ; यो वेबसाइटमा सुरक्षित हुँदैन। / Your details open in Gmail and are not stored here.</p>
      {sent && <p className="form-success" role="status"><CheckCircle2 aria-hidden="true" /> Gmail खुल्यो। विवरण जाँचेर Send थिच्नुहोस्। / Gmail opened; review and send.</p>}
    </form>
  );
}

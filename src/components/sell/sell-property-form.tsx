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
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.email("Please enter a valid email"),
  propertyType: z.enum(["house", "land"]),
  location: z.string().min(3, "Please add the property location"),
  area: z.string().min(1, "Please add the land area"),
  expectedPrice: z.string().min(1, "Please add your expected price"),
  details: z.string().min(10, "Please share a few more property details"),
});

type SellFormValues = z.infer<typeof sellSchema>;

export function SellPropertyForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: { propertyType: "house" },
  });

  const onSubmit = (values: SellFormValues) => {
    const subject = `Property listing request — ${values.propertyType} in ${values.location}`;
    const body = [
      "Hello GharJagga team,",
      "",
      "I would like to list my property.",
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Property type: ${values.propertyType}`,
      `Location: ${values.location}`,
      `Area: ${values.area}`,
      `Expected price: ${values.expectedPrice}`,
      "",
      "Details:",
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
          <Label htmlFor="name">Your name</Label>
          <Input id="name" placeholder="Suman Shrestha" {...register("name")} aria-invalid={Boolean(errors.name)} />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>
        <div className="form-field">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" placeholder="98XXXXXXXX" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <span className="field-error">{errors.phone.message}</span>}
        </div>
        <div className="form-field">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={Boolean(errors.email)} />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>
        <div className="form-field">
          <Label>Property type</Label>
          <Select defaultValue="house" onValueChange={(value) => value && setValue("propertyType", value as "house" | "land", { shouldValidate: true })}>
            <SelectTrigger className="form-select"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="house">House</SelectItem><SelectItem value="land">Land</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="form-field">
          <Label htmlFor="location">Property location</Label>
          <Input id="location" placeholder="Tole, municipality, district" {...register("location")} aria-invalid={Boolean(errors.location)} />
          {errors.location && <span className="field-error">{errors.location.message}</span>}
        </div>
        <div className="form-field">
          <Label htmlFor="area">Land area</Label>
          <Input id="area" placeholder="e.g. 4 aana or 10 dhur" {...register("area")} aria-invalid={Boolean(errors.area)} />
          {errors.area && <span className="field-error">{errors.area.message}</span>}
        </div>
        <div className="form-field field-full">
          <Label htmlFor="expectedPrice">Expected price</Label>
          <Input id="expectedPrice" placeholder="e.g. Rs. 2.5 Cr" {...register("expectedPrice")} aria-invalid={Boolean(errors.expectedPrice)} />
          {errors.expectedPrice && <span className="field-error">{errors.expectedPrice.message}</span>}
        </div>
        <div className="form-field field-full">
          <Label htmlFor="details">Tell us about the property</Label>
          <Textarea id="details" rows={4} placeholder="Road access, facing, rooms, nearby landmarks, document status…" {...register("details")} aria-invalid={Boolean(errors.details)} />
          {errors.details && <span className="field-error">{errors.details.message}</span>}
        </div>
      </div>
      <Button className="sell-submit" size="lg" type="submit" disabled={isSubmitting}>
        <Send aria-hidden="true" /> Open in Gmail
      </Button>
      <p className="form-privacy"><Mail aria-hidden="true" /> Your filled details open in Gmail; nothing is stored on this demo website.</p>
      {sent && <p className="form-success" role="status"><CheckCircle2 aria-hidden="true" /> Gmail compose opened. Review the details, then press Send.</p>}
    </form>
  );
}

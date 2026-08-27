"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
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
import { useLanguage, useSiteCopy } from "@/components/providers/language-provider";

const createSellSchema = (errors: { name: string; phone: string; email: string; location: string; area: string; price: string; details: string }) => z.object({
  name: z
    .string()
    .min(2, errors.name),
  phone: z
    .string()
    .min(8, errors.phone),
  email: z.email(errors.email),
  propertyType: z.enum(["house", "land"]),
  location: z
    .string()
    .min(3, errors.location),
  area: z
    .string()
    .min(1, errors.area),
  expectedPrice: z
    .string()
    .min(1, errors.price),
  details: z
    .string()
    .min(10, errors.details),
});

type SellFormValues = z.infer<ReturnType<typeof createSellSchema>>;

export function SellPropertyForm() {
  const { language } = useLanguage();
  const copy = useSiteCopy().form;
  const sellSchema = useMemo(() => createSellSchema(copy.errors), [copy.errors]);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: { propertyType: "house" },
  });
  const selectedPropertyType = useWatch({ control, name: "propertyType" });

  const onSubmit = (values: SellFormValues) => {
    const propertyType = values.propertyType === "house" ? copy.house : copy.land;
    const subject = language === "ne" ? `सम्पत्ति सूची अनुरोध — ${propertyType}, ${values.location}` : `Property listing request — ${propertyType}, ${values.location}`;
    const fields = language === "ne"
      ? ["नमस्कार GharJagga टोली,", "", "म मेरो सम्पत्ति सूचीबद्ध गर्न चाहन्छु।", "", `नाम: ${values.name}`, `फोन: ${values.phone}`, `इमेल: ${values.email}`, `सम्पत्तिको प्रकार: ${propertyType}`, `ठेगाना: ${values.location}`, `क्षेत्रफल: ${values.area}`, `अपेक्षित मूल्य: ${values.expectedPrice}`, "", "विवरण:", values.details]
      : ["Hello GharJagga team,", "", "I would like to list my property.", "", `Name: ${values.name}`, `Phone: ${values.phone}`, `Email: ${values.email}`, `Property type: ${propertyType}`, `Location: ${values.location}`, `Area: ${values.area}`, `Expected price: ${values.expectedPrice}`, "", "Details:", values.details];
    const body = fields.join("\n");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.salesEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="sell-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-grid">
        <div className="form-field">
          <Label htmlFor="name">{copy.name}</Label>
          <Input
            id="name"
            placeholder={copy.namePlaceholder}
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <span className="field-error">{errors.name.message}</span>
          )}
        </div>
        <div className="form-field">
          <Label htmlFor="phone">{copy.phone}</Label>
          <Input
            id="phone"
            placeholder="98XXXXXXXX"
            {...register("phone")}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <span className="field-error">{errors.phone.message}</span>
          )}
        </div>
        <div className="form-field">
          <Label htmlFor="email">{copy.email}</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}
        </div>
        <div className="form-field">
          <Label>{copy.propertyType}</Label>
          <Select
            defaultValue="house"
            onValueChange={(value) =>
              value &&
              setValue("propertyType", value as "house" | "land", {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="form-select">
              <SelectValue>
                {selectedPropertyType === "land" ? copy.land : copy.house}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">{copy.house}</SelectItem>
              <SelectItem value="land">{copy.land}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="form-field">
          <Label htmlFor="location">{copy.location}</Label>
          <Input
            id="location"
            placeholder={copy.locationPlaceholder}
            {...register("location")}
            aria-invalid={Boolean(errors.location)}
          />
          {errors.location && (
            <span className="field-error">{errors.location.message}</span>
          )}
        </div>
        <div className="form-field">
          <Label htmlFor="area">{copy.area}</Label>
          <Input
            id="area"
            placeholder={copy.areaPlaceholder}
            {...register("area")}
            aria-invalid={Boolean(errors.area)}
          />
          {errors.area && (
            <span className="field-error">{errors.area.message}</span>
          )}
        </div>
        <div className="form-field field-full">
          <Label htmlFor="expectedPrice">{copy.expectedPrice}</Label>
          <Input
            id="expectedPrice"
            placeholder={copy.pricePlaceholder}
            {...register("expectedPrice")}
            aria-invalid={Boolean(errors.expectedPrice)}
          />
          {errors.expectedPrice && (
            <span className="field-error">{errors.expectedPrice.message}</span>
          )}
        </div>
        <div className="form-field field-full">
          <Label htmlFor="details">{copy.details}</Label>
          <Textarea
            id="details"
            rows={4}
            placeholder={copy.detailsPlaceholder}
            {...register("details")}
            aria-invalid={Boolean(errors.details)}
          />
          {errors.details && (
            <span className="field-error">{errors.details.message}</span>
          )}
        </div>
      </div>
      <Button
        className="sell-submit"
        size="lg"
        type="submit"
        disabled={isSubmitting}
      >
        <Send aria-hidden="true" /> {copy.submit}
      </Button>
      <p className="form-privacy">
        <Mail aria-hidden="true" /> {copy.privacy}
      </p>
      {sent && (
        <p className="form-success" role="status">
          <CheckCircle2 aria-hidden="true" /> {copy.success}
        </p>
      )}
    </form>
  );
}

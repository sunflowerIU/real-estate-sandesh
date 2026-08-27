"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Home, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SellPropertyForm } from "@/components/sell/sell-property-form";
import { useSiteCopy } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

type SellDialogContextValue = {
  openSellDialog: () => void;
};

const SellDialogContext = createContext<SellDialogContextValue | null>(null);

export function SellPropertyDialogProvider({ children }: { children: ReactNode }) {
  const copy = useSiteCopy().dialog;
  const [open, setOpen] = useState(false);
  const openSellDialog = useCallback(() => setOpen(true), []);
  const contextValue = useMemo(() => ({ openSellDialog }), [openSellDialog]);

  return (
    <SellDialogContext.Provider value={contextValue}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sell-dialog">
          <div className="sell-dialog-heading">
            <span className="sell-dialog-icon" aria-hidden="true">
              <Home />
            </span>
            <div>
              <span className="sell-dialog-kicker">
                {copy.review}
              </span>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>
                {copy.description}
              </DialogDescription>
            </div>
          </div>
          <div className="sell-dialog-trust">
            <ShieldCheck aria-hidden="true" /> {copy.trust}
          </div>
          <SellPropertyForm />
        </DialogContent>
      </Dialog>
    </SellDialogContext.Provider>
  );
}

export function SellPropertyDialogTrigger({
  className,
  children,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const context = useContext(SellDialogContext);

  if (!context) {
    throw new Error(
      "SellPropertyDialogTrigger must be used within SellPropertyDialogProvider",
    );
  }

  return (
    <button
      className={cn(className)}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.openSellDialog();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

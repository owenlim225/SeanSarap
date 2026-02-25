"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { useState } from "react";
import { CheckoutDialog } from "@/components/CheckoutDialog";

interface CartSheetContentProps {
  formatPeso: (value: number) => string;
}

export function CartSheetContent({ formatPeso }: CartSheetContentProps) {
  const { items, cartCount, updateItem, removeItem } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">Your cart is empty.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 border-b-2 border-black pb-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {formatPeso(item.price)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateItem(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    −
                  </Button>
                  <span className="w-6 text-center font-bold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateItem(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SheetFooter className="border-t-4 border-black p-4">
        <div className="flex w-full flex-col gap-2">
          <p className="text-right font-bold">
            Total: {formatPeso(total)}
          </p>
          <Button
            className="w-full"
            disabled={cartCount === 0}
            onClick={() => setCheckoutOpen(true)}
          >
            Checkout
          </Button>
        </div>
      </SheetFooter>
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        formatPeso={formatPeso}
      />
    </>
  );
}

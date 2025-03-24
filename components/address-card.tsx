'use client'

import { Card } from "@/components/ui/card";
import { Address } from "@/types/address";
import { Edit2, MapPin, Trash2 } from "lucide-react";
import { AddAddressDialog } from "./address-dialog";
import { Button } from "./ui/button";

export function AddressCard({ address, onDelete, onEdit }: { 
  address: Address;
  onDelete: () => void;
  onEdit: (address: Address) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{address.label}</span>
              {address.isDefault && (
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">
                  Padrão
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{address.name}</p>
            <p className="text-sm text-gray-600">
              {address.planet === "Marte" ? `Lote ${address.lotNumber}` : address.lotNumber}
            </p>
            {address.details && (
              <p className="text-sm text-gray-500 mt-1">{address.details}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <AddAddressDialog address={address} onSave={onEdit}>
            <Button variant="ghost" size="icon">
              <Edit2 className="w-4 h-4" />
            </Button>
          </AddAddressDialog>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
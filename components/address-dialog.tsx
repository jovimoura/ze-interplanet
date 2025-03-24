"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Address } from "@/types/address";
import { useState } from "react";

export function AddAddressDialog({
  children,
  address,
  onSave,
}: {
  children?: React.ReactNode;
  address?: Address;
  onSave: (address: Address) => void;
}) {
  const initialFormState: Partial<Address> = {
    planet: "Terra",
    isDefault: false,
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Address>>(
    address || initialFormState
  );

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.label ||
      !formData.name ||
      !formData.lotNumber ||
      !formData.planet
    ) {
      return;
    }
    onSave(formData as Address);
    resetForm();
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button onClick={() => setDialogOpen(true)}>
            Adicionar Endereço
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {address ? "Editar endereço" : "Adicionar novo endereço"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              required
              placeholder="Ex.: Casa, Escritório, Biblioteca"
              value={formData.label || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, label: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Planeta</Label>
            <RadioGroup
              value={formData.planet}
              onValueChange={(value: "Marte" | "Terra") =>
                setFormData((prev) => ({
                  ...prev,
                  planet: value,
                  lotNumber: "",
                }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Terra" id="terra" />
                <Label htmlFor="terra">Terra</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Marte" id="marte" />
                <Label htmlFor="marte">Marte</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Nome do Contato</Label>
            <Input
              required
              placeholder="Nome completo"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              {formData.planet === "Terra"
                ? "Endereço Completo"
                : "Número do Lote (4 dígitos)"}
            </Label>
            <Input
              required
              placeholder={
                formData.planet === "Marte"
                  ? "Ex.: 1234"
                  : "Ex.: Rua ABC, 123, Bairro XYZ"
              }
              value={formData.lotNumber || ""}
              pattern={formData.planet === "Marte" ? "^[0-9]{4}$" : undefined}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lotNumber: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Detalhes Adicionais (Opcional)</Label>
            <Input
              placeholder="Qualquer detalhe adicional"
              value={formData.details || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, details: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="default"
              checked={formData.isDefault || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: e.target.checked,
                }))
              }
              className="rounded border-gray-300"
            />
            <Label htmlFor="default">Endereço Padrão</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Salvar alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash,
  IndianRupeeIcon,
  ChevronDown,
  ChevronUp,
  Sparkle,
} from "lucide-react";

interface Product {
  name: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  hsnCode: string;
  hsnDescription: string;
  category: string;
}

interface OrderFormProps {
  currentStep: number;
}

export default function OrderForm({ currentStep }: OrderFormProps) {
  if (currentStep !== 2) return null;

  const [products, setProducts] = useState<Product[]>([
    { name: "", sku: "", unitPrice: 0, quantity: 1, hsnCode: "", hsnDescription: "", category: "" },
  ]);

  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    orderDate: "",
    orderChannel: "",
    addOrder: "",
    channelInvoiceNo: "",
    channelInvoiceDate: "",
  });

  const [internationalClauses, setInternationalClauses] = useState({
    commodity3C: "No",
    meisApplicable: "No",
    igstPaymentStatus: "",
    incoTerms: "",
    paymentTerms: "DDP",
    useShippingRocket: false,
    iossNumber: "",
  });

  const [taxDiscount, setTaxDiscount] = useState({ tax: 0, discount: 0 });
  const [paymentDetails, setPaymentDetails] = useState({
    mode: "Prepaid",
    note: "Please note that payment method for international orders is prepaid",
  });
  const [otherCharges, setOtherCharges] = useState({ shippingCharges: 0, giftWrap: 0, transactionFee: 0 });
  const [openSection, setOpenSection] = useState<string | null>("OrderDetails");

  const toggleSection = (name: string) => setOpenSection((prev) => (prev === name ? null : name));

  const addProduct = () =>
    setProducts((prev) => [...prev, { name: "", sku: "", unitPrice: 0, quantity: 1, hsnCode: "", hsnDescription: "", category: "" }]);
  const removeProduct = (index: number) => setProducts((prev) => prev.filter((_, i) => i !== index));
  const updateProduct = <K extends keyof Product>(index: number, field: K, value: Product[K]) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const subtotal = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);
  const totalOtherCharges = otherCharges.shippingCharges + otherCharges.giftWrap + otherCharges.transactionFee;
  const total = subtotal + totalOtherCharges + taxDiscount.tax - taxDiscount.discount;

  const InputField = ({ label, value, onChange, type = "text" }: any) => (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="
          bg-gray-50
          border border-gray-300
          rounded-xl
          px-3 py-2.5
          text-black
          placeholder-gray-400
          transition
          hover:border-gray-500
          focus:outline-none
          focus:border-black
        "
      />
      <Sparkle size={12} className="absolute top-1 right-1 text-gray-400" />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }: any) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="
          bg-gray-50
          border border-gray-300
          rounded-xl
          px-3 py-2.5
          text-black
          transition
          hover:border-gray-500
          focus:outline-none
          focus:border-black
        "
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-gray-50">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const Section = ({ title, children, name }: any) => (
    <div className="border border-gray-300 rounded-2xl bg-gray-50 overflow-hidden">
      <button
        onClick={() => toggleSection(name)}
        className="w-full flex justify-between items-center px-4 py-3 text-black font-medium hover:bg-gray-100 transition"
      >
        {title}
        {openSection === name ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>

      <AnimatePresence>
        {openSection === name && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-gray-300 px-4 py-4 space-y-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-white text-black   rounded-2xl space-y-6   border-gray-300">

      {/* ORDER DETAILS */}
      <Section title="Order Details" name="OrderDetails">
        <div className="grid md:grid-cols-3 gap-4">
          <InputField
            label="Order ID"
            value={orderDetails.orderId}
            onChange={(e: any) => setOrderDetails({ ...orderDetails, orderId: e.target.value })}
          />
          <InputField
            label="Order Date"
            type="date"
            value={orderDetails.orderDate}
            onChange={(e: any) => setOrderDetails({ ...orderDetails, orderDate: e.target.value })}
          />
          <SelectField
            label="Order Channel"
            value={orderDetails.orderChannel}
            onChange={(e: any) => setOrderDetails({ ...orderDetails, orderChannel: e.target.value })}
            options={["Online", "Offline"]}
          />
        </div>
      </Section>

      {/* INTERNATIONAL CLAUSES */}
      <Section title="International Clauses" name="InternationalClauses">
        <div className="grid md:grid-cols-2 gap-4">
          <SelectField
            label="Commodity 3C applicable?"
            value={internationalClauses.commodity3C}
            onChange={(e: any) => setInternationalClauses({ ...internationalClauses, commodity3C: e.target.value })}
            options={["Yes", "No"]}
          />
          <SelectField
            label="MEIS applicable?"
            value={internationalClauses.meisApplicable}
            onChange={(e: any) => setInternationalClauses({ ...internationalClauses, meisApplicable: e.target.value })}
            options={["Yes", "No"]}
          />
          <InputField
            label="IGST Payment Status"
            value={internationalClauses.igstPaymentStatus}
            onChange={(e: any) => setInternationalClauses({ ...internationalClauses, igstPaymentStatus: e.target.value })}
          />
          <InputField
            label="INCO Terms"
            value={internationalClauses.incoTerms}
            onChange={(e: any) => setInternationalClauses({ ...internationalClauses, incoTerms: e.target.value })}
          />
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section title="Products Details" name="Products">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            layout
            className="bg-gray-50 p-4 rounded-2xl relative space-y-3 border border-gray-300"
          >
            <button
              onClick={() => removeProduct(idx)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
            >
              <Trash size={18} />
            </button>

            <div className="grid md:grid-cols-2 gap-3">
              <InputField label="Product Name" value={product.name} onChange={(e: any) => updateProduct(idx, "name", e.target.value)} />
              <InputField label="SKU" value={product.sku} onChange={(e: any) => updateProduct(idx, "sku", e.target.value)} />

              <div className="flex gap-2">
                <span className="flex items-center px-3 bg-gray-200 rounded-l text-black">
                  <IndianRupeeIcon size={16} />
                </span>
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={product.unitPrice}
                  onChange={(e: any) => updateProduct(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                  className="bg-gray-50 border border-gray-300 p-3 rounded-r text-black focus:outline-none focus:border-black transition w-full"
                />
              </div>

              <InputField
                label="Quantity"
                type="number"
                value={product.quantity}
                onChange={(e: any) => updateProduct(idx, "quantity", parseInt(e.target.value) || 1)}
              />

              <InputField label="HSN Code" value={product.hsnCode} onChange={(e: any) => updateProduct(idx, "hsnCode", e.target.value)} />
              <InputField label="HSN Description" value={product.hsnDescription} onChange={(e: any) => updateProduct(idx, "hsnDescription", e.target.value)} />
              <InputField label="Product Category" value={product.category} onChange={(e: any) => updateProduct(idx, "category", e.target.value)} />
            </div>
          </motion.div>
        ))}

        <button onClick={addProduct} className="flex items-center gap-2 text-gray-500 hover:text-black transition mt-2">
          <Plus size={18} />
          Add Another Product
        </button>
      </Section>

      {/* TAX & DISCOUNT */}
      <Section title="Tax & Discount" name="TaxDiscount">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Tax Amount" type="number" value={taxDiscount.tax} onChange={(e: any) => setTaxDiscount({ ...taxDiscount, tax: parseFloat(e.target.value) })} />
          <InputField label="Discount Amount" type="number" value={taxDiscount.discount} onChange={(e: any) => setTaxDiscount({ ...taxDiscount, discount: parseFloat(e.target.value) })} />
        </div>
      </Section>

      {/* PAYMENT DETAILS */}
      <Section title="Payment Details" name="Payment">
        <SelectField label="Mode of Payment" value={paymentDetails.mode} onChange={(e: any) => setPaymentDetails({ ...paymentDetails, mode: e.target.value })} options={["Prepaid", "COD"]} />
        {paymentDetails.mode === "Prepaid" && <p className="text-gray-600 text-sm mt-1">{paymentDetails.note}</p>}
      </Section>

      {/* OTHER CHARGES */}
      <Section title="Other Charges" name="OtherCharges">
        <div className="grid md:grid-cols-2 gap-4">
          {["shippingCharges", "giftWrap", "transactionFee"].map((field) => (
            <InputField
              key={field}
              label={field.replace(/([A-Z])/g, " $1")}
              type="number"
              value={otherCharges[field as keyof typeof otherCharges]}
              onChange={(e: any) => setOtherCharges({ ...otherCharges, [field]: parseFloat(e.target.value) })}
            />
          ))}
        </div>
      </Section>

      {/* TOTALS */}
      <div className="border border-gray-300 rounded-xl p-4 space-y-2 text-sm bg-gray-50">
        <div className="flex justify-between"><span>Subtotal</span><span>₹ {subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Other Charges</span><span>₹ {totalOtherCharges.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>₹ {taxDiscount.tax.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Discount</span><span>- ₹ {taxDiscount.discount.toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold border-t border-gray-300 pt-2"><span>Total</span><span>₹ {total.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

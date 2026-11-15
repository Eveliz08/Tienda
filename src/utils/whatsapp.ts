import type { CartItem } from '../types';

const PHONE_NUMBER = '5490000000000'; // TODO: reemplazar con tu número (formato internacional, sin +)

export function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (i) => `• ${i.quantity} x ${i.product.name} — $${(i.product.price * i.quantity).toLocaleString()}`,
  );
  return ['¡Hola! Quiero hacer este pedido:', '', ...lines, '', `Total: $${total.toLocaleString()}`].join('\n');
}

export function buildWhatsAppUrl(items: CartItem[], total: number): string {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(items, total))}`;
}

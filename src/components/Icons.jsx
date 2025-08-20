import React from 'react';

export const ShoppingCart = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#374151' }}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 2 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-3.77l-1.23 2H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H5.42c-.13 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 3H4.21l-.94-2H0v2h2l3.6 7.59L3.25 14H2v2h12c1.1 0 2-.9 2-2s-.9-2-2-2H5.42l1.48-2.67z" />
  </svg>
);

export const Search = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#6b7280', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const Star = ({ className }) => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: className === 'star-filled' ? '#f59e0b' : className === 'star-half' ? '#f59e0b' : '#d1d5db', opacity: className === 'star-half' ? 0.5 : 1 }}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const Zap = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const Shield = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
);

export const Battery = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.34C7 21.4 7.6 22 8.33 22h7.34c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
  </svg>
);

export const Truck = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff' }}>
    <path d="M20 8h-3V4H3v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h1v-6l-4-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export const Filter = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff' }}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);

export const X = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#374151' }}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const ChevronDown = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#374151' }}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

export const ChevronUp = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#374151' }}>
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
  </svg>
);

export const CartAddIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff', marginRight: '8px' }}>
    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 2 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-3.77l-1.23 2H5.21l-.94-2H1v2h2l3.6 7.59L3.25 14H2v2h12c1.1 0 2-.9 2-2s-.9-2-2-2H5.42l1.48-2.67z" />
  </svg>
);

export const RemoveIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#ef4444' }}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

export const PlusIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#2563eb' }}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const MinusIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: '#2563eb' }}>
    <path d="M19 13H5v-2h14v2z" />
  </svg>
);
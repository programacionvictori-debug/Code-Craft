---
title: "Sistema de inventario — Textiles del Norte"
eyebrow: "Caso de éxito · Sistemas"
client: "Textiles del Norte"
sector: "Textil y confección"
stack_label: "Python · PostgreSQL"
duration: "7 semanas"
summary: "Control de stock y facturación centralizados para 3 sucursales, con reportes en tiempo real."
challenge: "Textiles del Norte llevaba el inventario de sus 3 sucursales en hojas de cálculo independientes, sin visibilidad conjunta entre tiendas. Cada cierre de mes implicaba consolidar archivos a mano, y era habitual vender producto que ya no había en stock en otra sucursal."
solution: "Se construyó un sistema centralizado con un backend en Python y base de datos PostgreSQL, con un panel de administración por sucursal y una vista consolidada para la dirección. El módulo de facturación quedó integrado directamente con el inventario, así que cada venta descuenta stock en tiempo real."
includes:
  - "Inventario multi-sucursal sincronizado en tiempo real"
  - "Facturación integrada con descuento automático de stock"
  - "Reportes y exportes (Excel, PDF) por sucursal y consolidados"
  - "Roles de usuario: vendedor, encargado de sucursal y administración"
  - "Migración de los datos existentes desde las hojas de cálculo originales"
results:
  - num: "3"
    label: "sucursales conectadas en un solo sistema"
  - num: "0"
    label: "ventas de stock inexistente desde el lanzamiento"
  - num: "1"
    label: "cierre mensual consolidado, sin trabajo manual"
tags: ["python", "postgresql", "django", "reportes"]
order: 1
---

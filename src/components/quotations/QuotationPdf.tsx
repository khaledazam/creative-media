import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import type { Quotation, QuotationItem } from '@/lib/types';
import { formatPhone } from '@/lib/format-phone';

// Register Arabic font to support Arabic text and RTL
// Note: @react-pdf/renderer has limited native RTL support, but providing a font
// that supports Arabic characters is the first essential step.
Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/cairo/v20/SLXVc1nY6HkvangtZmpcZn2s.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Cairo',
    fontSize: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottom: '1 solid #eee',
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  companySub: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 10,
    color: '#444',
    marginBottom: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f8fafc',
    padding: 6,
    marginBottom: 10,
    color: '#0f172a',
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  customerLabel: {
    color: '#666',
    marginRight: 10,
  },
  customerValue: {
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottom: '1 solid #cbd5e1',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #f1f5f9',
    padding: 8,
  },
  colDesc: { flex: 4, textAlign: 'right' },
  colQty: { flex: 1, textAlign: 'center' },
  colUnit: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1.5, textAlign: 'center' },
  colTotal: { flex: 1.5, textAlign: 'left' },
  totalsBox: {
    width: '40%',
    alignSelf: 'flex-start',
    border: '1 solid #e2e8f0',
    borderRadius: 4,
    padding: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    color: '#64748b',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTop: '1 solid #e2e8f0',
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1 solid #eee',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

interface QuotationPdfProps {
  quotation: Quotation;
  customerName: string;
  customerCompany: string;
  customerPhone: string;
  customerEmail: string;
}

export const QuotationDocument = ({ quotation, customerName, customerCompany, customerPhone, customerEmail }: QuotationPdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>عرض سعر</Text>
          <Text style={styles.metaText}>رقم العرض: {quotation.quotationNumber}</Text>
          <Text style={styles.metaText}>التاريخ: {new Date(quotation.createdAt).toLocaleDateString('en-GB')}</Text>
          <Text style={styles.metaText}>صالح حتى: {new Date(quotation.validUntil).toLocaleDateString('en-GB')}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.companyName}>Creative Media</Text>
          <Text style={styles.companySub}>للدعاية والإعلان والتشطيبات</Text>
        </View>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>بيانات العميل</Text>
        <View style={styles.customerRow}>
          <Text style={styles.customerValue}>{customerName}</Text>
          <Text style={styles.customerLabel}>:اسم العميل</Text>
        </View>
        <View style={styles.customerRow}>
          <Text style={styles.customerValue}>{customerCompany || '-'}</Text>
          <Text style={styles.customerLabel}>:الشركة</Text>
        </View>
        <View style={styles.customerRow}>
          <Text style={styles.customerValue}>{customerPhone ? formatPhone(customerPhone) : '-'}</Text>
          <Text style={styles.customerLabel}>:الهاتف</Text>
        </View>
        <View style={styles.customerRow}>
          <Text style={styles.customerValue}>{customerEmail || '-'}</Text>
          <Text style={styles.customerLabel}>:البريد الإلكتروني</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colTotal}>الإجمالي</Text>
          <Text style={styles.colPrice}>سعر الوحدة</Text>
          <Text style={styles.colUnit}>الوحدة</Text>
          <Text style={styles.colQty}>الكمية</Text>
          <Text style={styles.colDesc}>البند</Text>
        </View>
        {quotation.items.map((item: QuotationItem, i: number) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colTotal}>{item.total.toFixed(2)}</Text>
            <Text style={styles.colPrice}>{item.unitPrice.toFixed(2)}</Text>
            <Text style={styles.colUnit}>{item.unit}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colDesc}>{item.description}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsBox}>
        <View style={styles.totalRow}>
          <Text style={styles.totalValue}>{quotation.subtotal.toFixed(2)} EGP</Text>
          <Text style={styles.totalLabel}>الإجمالي الفرعي</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalValue}>{quotation.discount.toFixed(2)} EGP</Text>
          <Text style={styles.totalLabel}>الخصم</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalValue}>{quotation.tax.toFixed(2)} EGP</Text>
          <Text style={styles.totalLabel}>الضريبة (14%)</Text>
        </View>
        <View style={styles.grandTotalRow}>
          <Text style={styles.grandTotalValue}>{quotation.total.toFixed(2)} EGP</Text>
          <Text style={styles.grandTotalLabel}>الإجمالي النهائي</Text>
        </View>
      </View>

      {/* Footer Notes */}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.sectionTitle}>الشروط والملاحظات</Text>
        <Text style={{ lineHeight: 1.5, textAlign: 'right' }}>
          {quotation.notes || 'الأسعار تشمل الضرائب المعمول بها. هذا العرض صالح حتى التاريخ المذكور أعلاه.'}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Creative Media - شركة مسجلة - جميع الحقوق محفوظة</Text>
      </View>

    </Page>
  </Document>
);

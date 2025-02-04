import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SpirometryData, ForecastData } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
});

interface Props {
  spirometryData: SpirometryData[];
  forecastData: ForecastData[];
}

export const PDFReport: React.FC<Props> = ({ spirometryData, forecastData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Spirometry Report</Text>
      
      <View style={styles.section}>
        <Text style={styles.heading}>Recent Measurements</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Date</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>FEV1</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>FVC</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Quality</Text>
            </View>
          </View>
          {spirometryData.slice(-5).map((reading) => (
            <View style={styles.tableRow} key={reading.id}>
              <View style={styles.tableCell}>
                <Text>{new Date(reading.timestamp).toLocaleDateString()}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{reading.fev1.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{reading.fvc.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{reading.quality}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const EmployeeHistory = () => {
  const [employee, setEmployee] = useState(null); // Employee data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://156.67.111.32:3020/api/Employee/transactions/1006',
        );
        console.log('API Response:', response);
        setEmployee(response.data); // Ensure this matches the structure of the API response
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleCheckIn = time => setCheckInTime(time);
  const handleCheckOut = time => setCheckOutTime(time);

  const calculateStayDuration = (checkIn, checkOut) => {
    // const checkInMoment = moment(checkIn, 'h:mm A');
    // const checkOutMoment = moment(checkOut, 'h:mm A');
    // const duration = moment.duration(checkOutMoment.diff(checkInMoment));

    // const hours = duration.hours();
    // const minutes = duration.minutes();

    // return `${hours} hr ${minutes} min`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.infoSection}>
            <Text style={styles.employeeName}>{employee.name}</Text>
            <Text style={styles.employeeRole}>{employee.department}</Text>
            <Text style={styles.employeeContact}>
              Contact: {employee.contact}
            </Text>
            <Text style={styles.employeeEmail}>Email: {employee.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Clock In & Out History</Text>
        {employee.visitHistory.map((visit, index) => (
          <View key={index} style={styles.visitCard}>
            <View style={styles.visitCardContent}>
              <Text style={styles.visitDate}>{visit.date}</Text>
              {visit.times.map((time, timeIndex) => (
                <View key={timeIndex} style={styles.visitTimes}>
                  <View style={styles.timeSection}>
                    <Text style={styles.timeLabel}>Check-in</Text>
                    <View style={styles.timeValue}>
                      <Icon name="access-time" size={24} color="#4CAF50" />
                      <Text style={styles.timeText}>{time.checkInTime}</Text>
                    </View>
                  </View>
                  <View style={styles.timeSection}>
                    <Text style={styles.timeLabel}>Check-out</Text>
                    <View style={styles.timeValue}>
                      <Icon name="access-time" size={24} color="#F44336" />
                      <Text style={styles.timeText}>{time.checkOutTime}</Text>
                    </View>
                  </View>

                  <View style={styles.stayDuration}>
                    <Text style={styles.durationLabel}>Duration: </Text>
                    <Text style={styles.durationText}>
                      {calculateStayDuration(
                        time.checkInTime,
                        time.checkOutTime,
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkInButton}
            onPress={() => handleCheckIn('2:27 PM')}>
            <Icon name="check-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Check-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => handleCheckOut('4:00 PM')}>
            <Icon name="check-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Check-out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  /* Your styles remain unchanged */
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default EmployeeHistory;

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { styles } from './styles';
import { type TypeTableSchema } from '@/app/character/_database';

export function CharacterInfo({
  description,
  ki,
  maxKi,
  race,
  gender,
  transformations,
}: TypeTableSchema) {
  // Valor de animación para el efecto "saltando"
  const jumpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia infinita: sube y baja en bucle
    Animated.loop(
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -5, // Ajusta la distancia de "salto"
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [jumpAnim]);

  return (
    <View style={styles.container}>
      {/* Informacion principal */}
      <View style={styles.properties}>
        {/* Description */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Description: </Text>
          <Text style={localStyles.value}>{description}</Text>
        </Text>

        {/* Ki */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Ki: </Text>
          <Text style={localStyles.value}>{ki}</Text>
        </Text>

        {/* Max Ki */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Max Ki: </Text>
          <Text style={localStyles.value}>{maxKi}</Text>
        </Text>

        {/* Race */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Race: </Text>
          <Text style={localStyles.value}>{race}</Text>
        </Text>

        {/* Gender */}
        <Text style={localStyles.line}>
          <Text style={localStyles.key}>Gender: </Text>
          <Text style={localStyles.value}>{gender}</Text>
        </Text>
      </View>

      {/* Lista de transformaciones */}
      {transformations?.length > 0 && (
        <View style={styles.stats}>
          <Text h2 style={localStyles.sectionTitle}>Transformations</Text>
          {JSON.parse(transformations).map((transformation) => (
            <View key={transformation.id} style={localStyles.transformationBox}>

              {/* Nombre con efecto "saltando" */}
              <Text style={localStyles.line}>
                <Text style={localStyles.key}>Name: </Text>
                <Animated.Text
                  style={[
                    localStyles.value,
                    { transform: [{ translateY: jumpAnim }] },
                  ]}
                >
                  {transformation.name}
                </Animated.Text>
              </Text>

              {/* Ki de la transformación */}
              <Text style={localStyles.line}>
                <Text style={localStyles.key}>Ki: </Text>
                <Text style={localStyles.value}>{transformation.ki}</Text>
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  line: {
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  key: {
    color: 'yellow',
    fontWeight: 'bold',
  },
  value: {
    color: 'white',
  },
  sectionTitle: {
    marginBottom: 10,
    color: 'yellow',
  },
  transformationBox: {
    marginBottom: 15,
  },
});

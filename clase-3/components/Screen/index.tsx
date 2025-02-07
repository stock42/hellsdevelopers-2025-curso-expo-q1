import React from 'react';
import { ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import { Header } from '@/components/Header';

import { styles } from './styles';

type Props = {
    children: React.ReactNode
    title?: string
    scroll?: boolean
};

export function Screen({ children, title, scroll = true }: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
            { title ? (<Header title={title} />) : null }
            {scroll ? <ScrollView style={styles.scrollView}>{children}</ScrollView> : children}
            </SafeAreaView>
        </SafeAreaProvider>

    );
}
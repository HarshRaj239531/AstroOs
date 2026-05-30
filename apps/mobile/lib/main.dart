import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/auth_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/dashboard_screen.dart';

void main() {
  runApp(
    const ProviderScope(
      child: AstraApp(),
    ),
  );
}

class AstraApp extends ConsumerWidget {
  const AstraApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return MaterialApp(
      title: 'AstraOS Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF4F46E5),
          brightness: Brightness.dark, // Keep dark theme consistent
        ),
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFF030712),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF030712),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      // Simple routing based on authentication state
      home: authState.status == AuthStatus.authenticated
          ? const DashboardScreen()
          : const LoginScreen(),
    );
  }
}

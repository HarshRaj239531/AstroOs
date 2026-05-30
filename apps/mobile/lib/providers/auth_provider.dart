import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum AuthStatus {
  unauthenticated,
  authenticating,
  authenticated,
  error,
}

class AuthState {
  final AuthStatus status;
  final String? email;
  final String? displayName;
  final String? errorMessage;

  const AuthState({
    required this.status,
    this.email,
    this.displayName,
    this.errorMessage,
  });

  factory AuthState.unauthenticated() {
    return const AuthState(status: AuthStatus.unauthenticated);
  }

  factory AuthState.authenticating() {
    return const AuthState(status: AuthStatus.authenticating);
  }

  factory AuthState.authenticated({required String email, required String displayName}) {
    return AuthState(
      status: AuthStatus.authenticated,
      email: email,
      displayName: displayName,
    );
  }

  factory AuthState.error(String message) {
    return AuthState(
      status: AuthStatus.error,
      errorMessage: message,
    );
  }

  AuthState copyWith({
    AuthStatus? status,
    String? email,
    String? displayName,
    String? errorMessage,
  }) {
    return AuthState(
      status: status ?? this.status,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState.unauthenticated());

  Future<bool> login(String email, String password) async {
    state = AuthState.authenticating();
    await Future.delayed(const Duration(milliseconds: 1500)); // Simulate API call

    if (email.trim().toLowerCase() == 'demo@astra.os' && password == 'password123') {
      state = AuthState.authenticated(
        email: email.trim(),
        displayName: 'Demo User',
      );
      return true;
    } else if (email.contains('@') && password.length >= 6) {
      // Allow any email/password combo for demo testing if it looks valid
      final parts = email.split('@');
      final name = parts[0][0].toUpperCase() + parts[0].substring(1);
      state = AuthState.authenticated(
        email: email.trim(),
        displayName: name,
      );
      return true;
    } else {
      state = AuthState.error('Invalid email or password. Use demo@astra.os / password123');
      return false;
    }
  }

  Future<bool> signup(String name, String email, String password) async {
    state = AuthState.authenticating();
    await Future.delayed(const Duration(milliseconds: 1500)); // Simulate API call

    if (name.trim().isEmpty) {
      state = AuthState.error('Name cannot be empty');
      return false;
    }
    if (!email.contains('@')) {
      state = AuthState.error('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      state = AuthState.error('Password must be at least 6 characters long');
      return false;
    }

    state = AuthState.authenticated(
      email: email.trim(),
      displayName: name.trim(),
    );
    return true;
  }

  void logout() {
    state = AuthState.unauthenticated();
  }

  void clearError() {
    if (state.status == AuthStatus.error) {
      state = AuthState.unauthenticated();
    }
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});

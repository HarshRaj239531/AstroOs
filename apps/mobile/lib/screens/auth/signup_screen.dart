import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/auth_provider.dart';
import '../../widgets/auth_text_field.dart';
import '../../widgets/gradient_button.dart';

class SignupScreen extends ConsumerStatefulWidget {
  const SignupScreen({super.key});

  @override
  ConsumerState<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends ConsumerState<SignupScreen> with SingleTickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _agreeToTerms = false;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeIn),
    );

    _slideAnimation = Tween<Offset>(begin: const Offset(0.0, 0.15), end: Offset.zero).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeOutBack),
    );

    _fadeController.forward();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  void _handleSignup() async {
    if (!_agreeToTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: const Color(0xFF991B1B),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          content: const Text('You must agree to the terms and conditions.'),
        ),
      );
      return;
    }

    if (_formKey.currentState!.validate()) {
      FocusScope.of(context).unfocus();
      final success = await ref.read(authProvider.notifier).signup(
            _nameController.text,
            _emailController.text,
            _passwordController.text,
          );

      if (success && mounted) {
        // Since the authProvider automatically transitions state to authenticated,
        // and main.dart routes based on auth status, we can pop back so that
        // when logged out, they are on login screen, and we clear routing stack.
        Navigator.pop(context);
      } else if (!success && mounted) {
        final errorMsg = ref.read(authProvider).errorMessage ?? 'Registration failed';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFF991B1B),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            content: Row(
              children: [
                const Icon(Icons.error_outline_rounded, color: Colors.white),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    errorMsg,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final isLoading = authState.status == AuthStatus.authenticating;

    return Scaffold(
      backgroundColor: const Color(0xFF030712), // Deep black background
      body: Stack(
        children: [
          // Background Glow Spots (Space Vibes)
          Positioned(
            top: -100,
            left: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF7C3AED).withOpacity(0.12), // Violet Glow
              ),
            ),
          ),
          Positioned(
            bottom: -150,
            right: -150,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF4F46E5).withOpacity(0.15), // Deep Indigo Glow
              ),
            ),
          ),

          // Back Button
          Positioned(
            top: 40,
            left: 16,
            child: Container(
              decoration: BoxDecoration(
                color: const Color(0xFF111827).withOpacity(0.6),
                shape: BoxShape.circle,
                border: Border.all(color: const Color(0xFF374151).withOpacity(0.5)),
              ),
              child: IconButton(
                icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                onPressed: () {
                  ref.read(authProvider.notifier).clearError();
                  Navigator.pop(context);
                },
              ),
            ),
          ),

          // Main Scrollable Area
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24.0, 56.0, 24.0, 24.0),
                child: FadeTransition(
                  opacity: _fadeAnimation,
                  child: SlideTransition(
                    position: _slideAnimation,
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          // Header Text
                          const Text(
                            'Create Workspace',
                            style: TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Register a new developer workspace account on AstraOS.',
                            style: TextStyle(
                              fontSize: 14,
                              color: Color(0xFF9CA3AF),
                            ),
                          ),
                          const SizedBox(height: 32),

                          // Full Name Input
                          AuthTextField(
                            controller: _nameController,
                            labelText: 'Full Name',
                            hintText: 'Enter your name',
                            prefixIcon: Icons.person_outline_rounded,
                            validator: (value) {
                              if (value == null || value.trim().isEmpty) {
                                return 'Name is required';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 18),

                          // Email Input
                          AuthTextField(
                            controller: _emailController,
                            labelText: 'Workspace Email',
                            hintText: 'Enter your email',
                            prefixIcon: Icons.email_outlined,
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value == null || value.trim().isEmpty) {
                                return 'Email is required';
                              }
                              if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
                                return 'Please enter a valid email address';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 18),

                          // Password Input
                          AuthTextField(
                            controller: _passwordController,
                            labelText: 'Password',
                            hintText: 'Choose a strong password',
                            prefixIcon: Icons.lock_outline_rounded,
                            isPassword: true,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Password is required';
                              }
                              if (value.length < 6) {
                                return 'Password must be at least 6 characters';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 18),

                          // Confirm Password Input
                          AuthTextField(
                            controller: _confirmPasswordController,
                            labelText: 'Confirm Password',
                            hintText: 'Re-enter your password',
                            prefixIcon: Icons.lock_outline_rounded,
                            isPassword: true,
                            textInputAction: TextInputAction.done,
                            onSubmitted: (_) => _handleSignup(),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please confirm your password';
                              }
                              if (value != _passwordController.text) {
                                return 'Passwords do not match';
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),

                          // Terms and Conditions checkbox
                          Theme(
                            data: Theme.of(context).copyWith(
                              unselectedWidgetColor: const Color(0xFF4B5563),
                            ),
                            child: CheckboxListTile(
                              value: _agreeToTerms,
                              onChanged: (val) {
                                setState(() {
                                  _agreeToTerms = val ?? false;
                                });
                              },
                              title: const Text(
                                'I agree to the AstraOS Terms of Service and Privacy Policy.',
                                style: TextStyle(color: Color(0xFF9CA3AF), fontSize: 12),
                              ),
                              controlAffinity: ListTileControlAffinity.leading,
                              contentPadding: EdgeInsets.zero,
                              activeColor: const Color(0xFF818CF8),
                              checkColor: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 24),

                          // Signup Button
                          GradientButton(
                            text: 'Create Account',
                            onTap: _handleSignup,
                            isLoading: isLoading,
                            gradientColors: const [Color(0xFF7C3AED), Color(0xFFC084FC)],
                          ),
                          const SizedBox(height: 24),

                          // Back to Login Switcher
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text(
                                'Already have a workspace? ',
                                style: TextStyle(color: Color(0xFF9CA3AF), fontSize: 14),
                              ),
                              GestureDetector(
                                onTap: () {
                                  ref.read(authProvider.notifier).clearError();
                                  Navigator.pop(context);
                                },
                                child: const Text(
                                  'Log in here',
                                  style: TextStyle(
                                    color: Color(0xFF818CF8),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

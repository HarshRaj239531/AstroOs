import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:astraos_mobile/main.dart';

void main() {
  testWidgets('Auth screen elements smoke test', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(800, 1200);
    tester.view.devicePixelRatio = 1.0;
    addTearDown(() {
      tester.view.resetPhysicalSize();
      tester.view.resetDevicePixelRatio();
    });

    // Build our app and trigger a frame.
    await tester.pumpWidget(
      const ProviderScope(
        child: AstraApp(),
      ),
    );
    await tester.pumpAndSettle();

    // Verify that our Login screen is shown by checking header and fields
    expect(find.text('ASTRA OS'), findsOneWidget);
    expect(find.text('Log in to access your secure workspace dashboard.'), findsOneWidget);
    expect(find.text('Workspace Email'), findsOneWidget);
    expect(find.text('Workspace Password'), findsOneWidget);
    expect(find.text('Log In'), findsOneWidget);
    expect(find.text('Register workspace'), findsOneWidget);

    // Tap on Register workspace link to navigate to SignupScreen
    await tester.ensureVisible(find.text('Register workspace'));
    await tester.tap(find.text('Register workspace'));
    await tester.pumpAndSettle();

    // Verify that Signup screen is shown
    expect(find.text('Create Workspace'), findsOneWidget);
    expect(find.text('Register a new developer workspace account on AstraOS.'), findsOneWidget);
    expect(find.text('Full Name'), findsOneWidget);
    expect(find.text('Create Account'), findsOneWidget);
  });
}

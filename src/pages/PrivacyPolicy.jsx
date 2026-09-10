import React from 'react';
import { LegalPage } from '../components/layout/LegalPage';

export function PrivacyPolicy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" description="Read the Katty’z Privacy Policy covering website technical data, embedded maps, external ordering links and cookies." updated="11 September 2026">
      <p>This policy explains how information may be handled when you visit the Katty’z website.</p>

      <h2>Information we collect</h2>
      <p>This website does not currently provide customer accounts, online checkout or a contact form. We do not ask you to submit personal information directly through the website.</p>

      <h2>Technical information</h2>
      <p>Our hosting provider may process limited technical information, such as your IP address, browser type, device type and access time, to deliver the website, maintain security and diagnose technical problems.</p>

      <h2>Maps and external services</h2>
      <p>Outlet pages contain embedded Google Maps. Ordering and social links may take you to Google Maps, Zomato or Instagram. Those services may collect information and use cookies under their own privacy policies. Their privacy practices are controlled by the respective service providers.</p>

      <h2>Cookies</h2>
      <p>Katty’z does not currently set advertising or account cookies through this website. Embedded and linked third-party services may use their own cookies or similar technologies.</p>

      <h2>Data sharing and retention</h2>
      <p>We do not sell personal information. Any limited technical data processed for website delivery is retained according to the practices of the applicable hosting and infrastructure providers.</p>

      <h2>Your choices</h2>
      <p>You can restrict cookies through your browser and avoid using embedded or linked third-party services. Some website features, including maps, may then be unavailable.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy when the website’s features or data practices change. The latest revision date will appear at the top of this page.</p>

      <h2>Contact</h2>
      <p>For privacy questions, contact Katty’z using the telephone details listed on the Outlets page.</p>
    </LegalPage>
  );
}

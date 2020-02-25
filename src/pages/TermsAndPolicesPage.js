import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";

export const TermsAndPolicesPage = () => {

  const Prometeus = '{Prometeus}'

  return(
    <Grid container >
      <Grid item xs={12}>
          <AppBar currentActiveRoute="terms" />
      </Grid>
        <div className="static-page-container">
          <div className="static-page-logo-container">
            <img src="/page_img/terms_of_service_page.png" />
            <h1>Terms of Service</h1>
          </div>
          <div>
            <div>
              <p>
                Company and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Website.
              </p>
              <p>
                Please be aware of the Terms of Sale, Privacy Policy, and Copyright Policy which are incorporated into these Terms of Use by reference.
              </p>
              <p>
                We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Promp Talk thereafter. Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
              </p>
              <p>
                You are responsible for making all arrangements necessary for you to have access to the Promp Talk and ensuring that all persons who access the Promp Talk through your internet connection are aware of these Terms of Use and comply with them.
              </p>
              <p>
                If you choose, or are provided with, a wallet ID and it's password, or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to Promp Talk or portions of it using your user name, password, or other security information. You agree to notify us immediately of any unauthorized access to or use of your user name or password or any other breach of security. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.
              </p>
              <p>
                We are not responsible or liable to any third party for the content or accuracy of any User Contributions posted by you or any other user of the Promp Talk.
              </p>
            </div>
          </div>
        </div>

        <div className="static-page-container">
          <div className="static-page-logo-container">
            <img src="/page_img/privacy_policies_page.png" />
            <h1>Privacy Policies</h1>
          </div>
          <div>
            <div>
              <p>
                Version 1.22 (24 Feb 2020) 
                Prometeus Team (”Prometeus” or “We”) respect your privacy and are committed to protecting it through our compliance with this policy.
              </p>
              <p>
                This policy describes the types of information we may collect from you or that you may provide when you use our Decentralized Social Media named Promp Talk and our practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
              <p>
                Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use Promp Talk. 
              </p>
              <p>
                By accessing or using this Promp Talk service, you agree to this privacy policy. This policy may change from time to time (see Changes to our Privacy Policy, below). Your continued use of Promp Talk after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
              </p>
              <p>
                Please note that Promp Talk is not intended for children under 18 years of age. No one under age 18 may provide any information to or on Promp Talk. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on Promp Talk, register on it, make any purchases through other services of {Prometeus} Metwork, use any of the interactive or public comment features of Promp Talk, or provide any information about yourself. If you believe we might have any information from or about a child under 18, please contact us immediately.
              </p>
              <p>
                We collect several types of information from and about users of Promp Talk, which is about you but individually does not identify you, such as the content of your user profile; and/or about your internet connection, the equipment you use to access our Website, and usage details. We do not use any types of KYC to identify our users. The global identifier of our users is {Prometeus} wallet ID.
              </p>
              <p>
                Information that you provide by filling in forms on Promp Talk. This includes information provided at the time of registering to use Promp Talk, subscribing to our service, posting material, or requesting further services. We may also ask you for some additional information when you report a problem with Promp Talk.
              </p>
              <p>
                A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to use some features of Promp Talk. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to Promp Talk. We do not collect personal information automatically, but we may tie this information to personal information about you that we collect from other sources or you provide to us.
              </p>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to Promp Talk. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on Promp Talk.
              </p>
              <p>
                It is our policy to post any changes we make to our privacy policy on this page with a notice that the privacy policy has been updated on Promp Talk. The date the privacy policy was last revised is identified at the top of the Privacy Policy area.
              </p>
            </div>
          </div>
        </div>

        <div className="static-page-footer">
          <div><p>© 2020 {Prometeus} Team</p></div>
          <div>
            <ul>
              <li>Settings</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Help Center</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
    </Grid>
  )
}
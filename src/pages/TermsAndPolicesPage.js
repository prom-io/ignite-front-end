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
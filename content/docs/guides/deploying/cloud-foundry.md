---
path: "/docs/deploying/cloud-foundry"
title: Deploying with Cloud Foundry
---

#Deploying with Cloud Foundry

This guide will show you how to deploy your Kitura application to a Cloud Foundry based cloud environment. The guide assumes you already have an environment to deploy to. If not, you can sign up to IBM Cloud for free and use it to host your Cloud Foundry apps.

----

##Step 1: Create a manifest.yml file

If you used the Kitura CLI, or macOS app, to create your Kitura project, your generated Kitura project will already contain a manifest.yml file which you can use to deploy your application.

If you created your Kitura application from scratch, create a manifest.yml file in the root directory of your application. Once you have created the file, add the following to your file, replacing MYAPP with the name of your application.

```
---
applications:
- name: MYAPP
```

If you're deploying to the default Swift buildpack on IBM Cloud, you also need to supply the command required to run your application, for example:

```
  command: "'MYAPP'"
```

Although you can deploy applications without a manifest, manifests provide consistency and reproducibility across deployments. You can also specify additional application attributes within your manifest.

We are going to use the Cloud Foundry command line interface, so first we need to install the Cloud Foundry CLI.

If you are using IBM Cloud, it is recommended that you deploy to Cloud Foundry using the IBM Cloud CLI tools.

Download the required CLI tools using the Kitura CLI:

```
kitura idt
```

> If you don't have the Kitura CLI installed, you can also install the required CLI tools with the following command:
> ```
> curl -sL https://ibm.biz/idt-installer | bash
> ```

---

##Step 2: Set URL target

To push your application, you first need to consult your cloud operator to find the URL you need to target. If you are on IBM Cloud, you can look in the IBM Cloud Foundry CLI documentation for the cf api command to locate the Cloud Foundry API endpoint for your region.

You can set it in the command line like this:

```
cf login -a <API endpoint>
```

For example, if your IBM Cloud account is in the eu-gb region this would be:

```
cf login -a api.eu-gb.cf.cloud.ibm.com
```

You’ll also need to provide your username and password when prompted.

> If you are deploying to the IBM Cloud, it is recommended that you use the IBM Cloud CLI. To do this all you need to do is add the ibmcloud prefix to the cf commands throughout this guide, for example:
> ```
> ibmcloud cf login -a <API endpoint>
> ```

---

##Step 3: Set target organisation

If you are on IBM Cloud, you can find your organisation and space by logging into IBM Cloud and going into Manage > Account > Cloud Foundry orgs. If you are on the Lite/free tier an organisation will have already been created in your account, the organisation name is the name listed on this page, in my case it's my email address.

To find the associated spaces within the organisation, click ... (next to your organisation) and select Spaces. If there are no spaces listed, click Add a space to create one, specifying your choice of name (e.g. dev) and region. Make sure that you locate your space in the same region as your API endpoint!

Set target:

```
cf target -o <organisation> -s <space>
```

---

##Step 4: Push your app

Now, you’re ready to push your app. Simply run the following command from the same location as your manifest.yml:

```
cf push
```

Your Kitura application should now be successfully deployed into your Cloud Foundry environment! If you have a manifest.yml file which was generated for you, it will have been assigned a random route as the file contains:

```
random-route: true
```

If you visit this URL you should see your running application.


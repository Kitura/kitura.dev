---
path: "/docs/deploying/kubernetes"
title: Deploying with Kubernetes
---

#Deploying with Kubernetes

Kubernetes is a platform which allows you to automate the deployment, scaling and management of your containerized applications.

You can deploy your Kitura application to any Kubernetes cluster. In this guide we will use the Kubernetes Service on IBM Cloud.

---

##Step 1: Create Cluster on IBM Cloud

Before we can create a Kubernetes Cluster on IBM Cloud we need to create an IBM Cloud account.

Once we have an IBM Cloud account, we can create a Kubernetes cluster by visiting the IBM Cloud Catalog. The link will take you to the Containers page, select Kubernetes Service and click Create.

When you create the new cluster, ensure the Free plan option is selected, and the cluster name, for the purposes of this example, is myapp-cluster.

> Set Geography and Metro to whatever is local to you and click the Create cluster button.

Creating a cluster takes several minutes, so grab a tea or coffee in the meantime!

---

##Step 2: Gain access to your Cluster

Now that we have created our Kubernetes cluster we need to gain access to it, to do this we need to install the IBM Cloud CLI tools.

Download the required CLI tools using the Kitura CLI:

```
kitura idt
```

> If you don't have the Kitura CLI installed, we can also install the required CLI tools with the following command:
> ```
> curl -sL https://ibm.biz/idt-installer | bash
> ```

In order to log into IBM Cloud via the command line we will need to know some information about our cluster. To find these values, view your cluster in the IBM Cloud, select ... and choose the menu option Connect via CLI.

Follow the instructions to log into IBM Cloud, download the kubeconfig files for your cluster, set up the KUBECONFIG environment variable, and verify kubectl can communicate with your cluster.

We should now be able to use kubectl to manage our cluster.

> Note: The latest stable version of kubectl is installed with the base IBM Cloud CLI. However, to work with our cluster, you need the Kubernetes CLI major.minor version that matches the Kubernetes cluster major.minor version that you are using.
> Check that the version of your client kubectl CLI matches the version of the cluster API server by running:
> ```
> kubectl version --short
> ```
> If the client kubectl version needs updating follow these install instructions. If you install a new version of the kubectl client you need to rerun the configuration steps above (downloading the kubeconfig files and setting up your KUBECONFIG environment variables).

---

##Step 3: Push your Docker image

If you followed our Docker guide, you will have created a runtime Docker image which contains your compiled Kitura application, and the necessary Swift runtime libraries. If you haven't already, tag it appropriately for the registry you are using and push it. If you are yet to choose a registry and have no specific requirements, we suggest you try Docker Hub.

---

##Step 4: Update Helm Chart

Helm is a package manager for Kubernetes applications. Helm charts are packages that contain enough information to install Kubernetes resources into a Kubernetes cluster. Charts contain a Chart.yaml file along with templates, default values (defined in values.yaml) and dependencies.

> If you created your application using the Kitura CLI or the macOS app then you should already have a Helm chart provided.
> If not then you can follow the Helm docs to create your own chart.

The Helm chart provided with the Kitura CLI and macOS is configured out of the box for the application.

All we need to do is edit the repository and tag variables in the values.yaml file in our /chart/<your-appname> directory, to point at the location and tag for our Docker image:

```
image:
    repository: registry-1.docker.io/<your-namespace>/myapp-run
    tag: v1.0.0
        
```

---

##Step 5: Deploy Application

Helm is comprised of two parts: Helm (the client) and Tiller (the server). To begin working with Helm run:

```
helm init
```

This will install Tiller into our running Kubernetes cluster and set up any necessary local configuration.

Tiller runs inside your Kubernetes cluster, and manages releases of your charts. Tiller needs access to the Kubernetes API to be able to do this. Most cloud providers, including IBM Cloud, enable a feature called Role-Based Access Control (RBAC) - these policies are used for the management of your cluster, they allow you to specify which types of actions are permitted depending on the user and their role. By default, in an RBAC-enabled Kubernetes cluster, Tiller will not be permitted to carry out these operations, so we need to create a service account for Tiller with the right roles and permissions to access resources.

Bitnami has a great guide outlining how to do this, follow Use Case 2: Enable Helm In Your Cluster to configure RBAC in your Kubernetes cluster.

To deploy our application using Helm install, run the following from the /chart/<your-appname> directory, using --name to specify the name:

```
helm install --name bookstore-app .
```

You may have to wait a few minutes for it to be available, but your application should now be deployed to your Kubernetes cluster.

---

##Step 6: View Deployed Application

To view our application running on IBM Cloud, we need to find the public IP of the worker node it has been deployed to, and the port that our application has been deployed to (also known as the NodePort).

###Get the Public IP:

We can use the following command to find the Public IP for our application:

```
ibmcloud cs workers myapp-cluster
```

###Get the NodePort:

First, we get a list of all the running services:

```
kubectl get services
```

We can find our service name in the list of running services and use this to get the NodePort of our service:

```
kubectl describe service bookstore-app-service
```

Then in a browser we can navigate to:

```
http://<Public-IP>:<NodePort>
```

Congratulations! We should now see our application running on IBM Cloud!


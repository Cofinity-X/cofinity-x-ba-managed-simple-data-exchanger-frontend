# Simple Data Exchanger - User Guide

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021,2022,2023 T-Systems International GmbH
- SPDX-FileCopyrightText: 2022,2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/managed-simple-data-exchanger-frontend

## Table of contents

- [Getting started](#getting-started)
  - [Accessing the app](#accessing-the-app)
    - [Login](#login)
    - [Logout](#logout)
  - [Navigation](#navigation)
    - [Header](#header)
    - [Main navigation](#left-side-menu)
- [Features](#features)
  - [Home](#home)
  - [Provider](#provider)
    - [Create Data](#create-data)
      - [Upload File](#upload-file)
      - [Manual Entry](#manual-entry)
        - [Serial Part](#serial-part-typization)
        - [Batch](#batch)
        - [Single Level BoM As Built](#single-level-bom-asbuilt)
        - [Part As Planned](#part-as-planned)
        - [Single Level Bom As Planned](#single-level-bom-as-planned)
        - [Part Site Information As Planned](#part-site-information-as-planned)
        - [Single Level Usage As Built](#single-level-usage-as-built)
    - [Upload history](#upload-history)
    - [Contracts](#provider-contracts)
    - [Help](#help)
  - [Consumer](#consumer)
    - [Consume Data](#consume-data)
    - [Contracts](#consumer-contracts)

# Getting started

## **Accessing the app**

[SDE](https://dft.int.demo.catena-x.net/) can be accessed via the internet. The recommended browser is Google Chrome. You need to request an account to access it.

### **Login**

<img src="images/catenax-login-org-select.png" height="60%" width="60%">
<img src="images/catenax-login-org-search.png" height="60%" width="60%"> 
<img src="images/catenax-keycloak-signin.png" height="60%" width="60%">

1. Open **S**imple **D**ata **E**xchanger application via the [URL](https://dft.int.demo.catena-x.net/) (recommended browser Google Chrome).
2. Select the organization from the list or search the organization by typing name in input textbox and select the organization from the search results to login to the Simple Data Exchanger application. After selecting the organization from the list, it will redirect to the CatenaX keycloak login page.
3. On Keycloak login page of the selected organization, enter login details i.e. Username or email and Password. Click on Sign In button to login to the Simple Data Exchanger application.

### **Logout**

<img src="images/sde-profile-menu.png" width="320"/>&nbsp;&nbsp;<img src="images/catenax-login-org-search.png" width="320">

1. On the header, click on the user avatar (top right).
2. On the menu click on "Logout".
3. You have signed-out of Simple Data Exchanger application and will be redirected back to the CatenaX signin page.

[-- end of 'getting started' section --]: #

# Navigation

SDE navigation is based on a header and a left-side menu.

## **Header**

<img src="images/sde-header.png" alt="SDE header"/>

1. On the left side on the header, there is the Simple Data Exchanger header text.
2. On the right side of the header, there is a help link. When clicked, it will redirect the user to simple data exchanger user guide. And there is avatar of the logged-in user. When clicked, there are few information about the logged in user, Logout link and Language switching options will be visible.

## **Left-side menu**

<img src="images/sde-sidemenu.png" alt="SDE sidemenu" height="350"/>

On the left side menu, it is possible to navigate the Simple Data Exchanger application by choosing each the following options / features:

- Home

**Provider**

- Create Data
- Upload History
- Contracts
- Help

**Consumer**

- Consume Data
- Contracts

[-- end of 'navigation' section --]: #

# Features

# **Home**

<img src="images/sde-home.png" height="60%" width="60%" />

After successful login, user will be redirected to this page by default in the Simple Data Exchanger application. This page contains the overview of the application and use cases selection.

Submodels in the Create Data page will be filtered out based on the usecase selection by user.

# **Provider**

## Create Data

In this page, list of available submodels will be fetched dynamically and we can select any submodel to generate the table or json of that selected submodel based on the schema provided by backend API.

This dynamic UI implementation allows the flexibillity to support and manage multiple submodels in single SDE application and also eliminates the need of hard coded react components for the individual submodels.

There are 2 data providing options in SDE i.e. CSV Upload and Manual entry.
The top level Select submodel dropdown will be common for all of 2 tabs i.e. Upload File, Manual entry. Based on the selected submodel user can download the respective CSV sample and template.

Preview of submodel including help description is provided as collapsible view.

This Create Data page combines all the Data provider options like:-

- ### Upload File

<img src="images/sde-create-data.png" height="60%" width="60%" />

You can upload CSV files of various supported Submodels.

At the moment, Simple Data Exchanger supports data proving options for below list of submodels,

- Serial Part.
- Single Level Bom AsBuilt.
- Batch.
- Part AsPlanned.
- Single Level Bom AsPlanned.
- Part Site Information AsPlanned.
- Single Level Usage AsBuilt.

You can click on the button "Choose a file" and select the proper CSV file present in your file system or you can just drag and drop your file in the drop area under upload file component.

<img src="images/sde-configure-policy.png" height="60%" width="60%" />

After successful file upload of the supported file format i.e. CSV, the button "Next Step - Configure Policies" will be enabled and after clicking on the same, Policy selection dialog will be shown where we need to configure Access and Usage policy.

Access policy can either be unrestricted or restricted to some Business Partner Numbers. Your own organization will always be allowed to access the data.  We can add BPN numbers by selecting Company Name or entering Business Partner Number   and clicking on Add button.

There are 4 types of Usage Policies we can configure namely Duration, Purpose, Role and Custom Restriction.
For every usage policy we have restricted and unrestricted options.
If we selected Restricted option for any usage policy, then we need to enter or select any respective valid text value.

Once configuring both the policies, we need to click on "SUBMIT" button and wait for upload to finish.
This is the process of creating new data offer through SDE application by uploading CSV file.

- ### Manual entry

#### Serial Part

<img src="images/sde-serial-part-tabular.png" height="60%" width="60%" />

#### Batch

<img src="images/sde-batch-tabular.png" height="60%" width="60%" />

#### Single Level BoM AsBuilt

<img src="images/sde-assembly-tabular.png" height="60%" width="60%" />

#### Part AsPlanned

<img src="images/sde-part-planned-tabular.png" height="60%" width="60%" />

#### Single Level Bom AsPlanned

<img src="images/sde-single-bom-tabular.png" height="60%" width="60%" />

#### Part Site Information AsPlanned

<img src="images/sde-part-site-info-tabular.png" height="60%" width="60%" />

#### Single Level Usage AsBuilt

<img src="images/sde-single-level-usage-table.png" height="60%" width="60%" />

You can add and submit multiple data offers via Manual entry option for particular submodel by clicking on "Add Row" button to bulk upload the multiple data offers in one go. Once you enter details in all of the required fields for a particular row, you need to select which offers we need to upload by ticking the checkboxes for the respective rows and then we need to click on "Next Step - Configure Policies" button to configure Access and Usage policies and then you need to click on Submit button from policy dialog to upload the data. You can upload the data for multiple submodels by selecting the respective submodel from the top level Select submodel dropdown.
We also can delete multiple rows by selecting which rows we want to delete and then click on Delete Row(s) button.

Then you need to configure Access and Usage policies by clicking on "Next Step - Configure Policies" button and after successful configuration, click on Submit button from policy dialog to upload bulk data offers at once.

## Upload history

<img src="images/sde-upload-history.png" height="60%" width="60%" />

In this menu you can see the list of uploaded data offers.

The table has the following columns:

- Process Id
- CSV Type
- Created(number of Successfully Created items)
- Updated(number of Successfully Updated items)
- Deleted(number of Successfully Deleted items)
- Failed(number of failed items)
- Status
- Start Date

User can delete and download any uploaded data offer by clicking on the respective action icon present at the end of each row.
The delete icon will only be visible if the Number of Deleted Items count is 0.
After the successful data offer deletion, new row will be generated which shows the new process id and the reference id of the deleted data offer.
Uploaded submodel details can also be downloaded from here as CSV. Only for the deleted entry download option won't be visible.
We can fetch the updated data offers by manually clicking on Refresh button present at top right section of the Upload History page.

User can see the detailed error logs during the upload data by clicking "View errors" link.

<img src="images/sde-upload-error-logs.png" height="60%" width="60%" />

## Provider Contracts

<img src="images/sde-provider-contracts.png" height="60%" width="60%" />

This page contains an overview of the data exchange contracts your organization has with other Catena-X members to provide data. 

The table includes below columns:

- Asset ID (ID of the Asset);
- Consumer Counter Party Address (Counter party address of the contract agreement);
- Signing Date (Signing date of the contract agreement);
- End Date (End date of the contract agreement, if duration restriction under usage policies is unrestricted while creating data then there is no end date and its unlimited);
- Status (FINALIZED or TERMINATED or ERROR or DECLINED);

## Help

<img src="images/sde-help-page.png" height="60%" width="60%" />

This dynamic help page provides the submodel informations of selected use case in the home page. If no use case selected, it will show all available submodels. User can see the the order of the fields and details of each field by hovering the info icon in each row. User can download the sample csv and csv template for any submodels as well from this page.

# **Consumer**

## Consume Data

<img src="images/sde-consume-data-page.png" height="60%" width="90%" />

After clicking on the "Consume Data" link in the sidebar navigation menu, user will be redirected to this Consumer view page. On this page, we need to select search type as Company Name or Business Partner Number or Connector URL(For select search type as Connector URL we have to enter connector URL manually). After entering the Company Name or Business Partner Number select connector dropdown will show the available connectors to select. After selecting connector,Search button will get enabled, we need to click on "Search" button to search or fetch the list of contract offers catalogs.  After the successful query operation, the below table will populate list of Contract offers. The table will show the basic meta data of the offers and include the below columns,

- Title (This is title of the data offer or name of the submodel);
- Asset ID (ID of the Asset);
- Created On (Created Date of the offer);
- Description (Description of the data offer);

The table provides convinient features like Filter by, Sorting, Global search, Pagination, Export.

<img src="images/offer-details-view-subscribe.png" height="40%" width="40%" />

Also we can view and subscribe individual data offer by clicking on the respective row to open the offer details popup.
The offer details dialog will populate all the basic metadata of the selected offer, Access policy and Usage policy details.
You can subscribe the data offer by clicking on "Subscribe" button and accepting the terms.

<img src="images/multiple-offers-subscribe.png" height="60%" width="60%" />

User can also subscribe to multiple data offers at a time by ticking or checking the checkbox in front of the data offers and clicking on the button "Subscribe to Selected" present at top right section of the data offers table.
Please note that, user can only subscribe to multiple data offers if the offers have exact similar usage policies configured.
After clicking on Subscribe button and agreeing to the terms and conditions, the contract agreements establishment process will start for all of the selected data offers for the subscription.

## Consumer Contracts

<img src="images/sde-consumer-contracts.png" height="60%" width="90%" />

This page contains an overview of the data exchange contracts your organization has with other Catena-X members to receive & consume data from them.

The table includes below columns:

- Asset ID (ID of the Asset);
- Provider Counter Party Address (Counter party address of the contract agreement);
- Signing Date (Signing date of the contract agreement);
- End Date (End date of the contract agreement, if duration restriction under usage policies is unrestricted while creating data then there is no end date and its unlimited);
- Status (FINALIZED or TERMINATED or ERROR or DECLINED);

[-- end of 'features' section --]: #

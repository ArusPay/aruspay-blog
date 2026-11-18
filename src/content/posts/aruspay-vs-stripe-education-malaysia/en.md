---
title: "ArusPay vs Stripe for Malaysian schools and universities"
description: "ArusPay vs Stripe for Malaysian education: FPX fees, settlement, fee billing and student portals compared with sourced data, plus a bursar checklist."
primaryKeyword: "ArusPay vs Stripe"
date: 2026-11-17
updated: 2026-11-17
tags: ["comparison", "payment-gateway", "education", "fpx"]
type: "comparison"
heroImage: "./hero.webp"
heroAlt: "Illustration of two green streams meeting in front of a university building on a cream background"
sources: [{"url": "https://stripe.com/en-my/pricing", "title": "Stripe Malaysia: Pricing & Fees", "accessed": "2026-11-17"}, {"url": "https://stripe.com/en-my/invoicing/pricing", "title": "Stripe Invoicing: Pricing", "accessed": "2026-11-17"}, {"url": "https://docs.stripe.com/payments/fpx", "title": "FPX payments | Stripe Documentation", "accessed": "2026-11-17"}, {"url": "https://docs.stripe.com/payments/bank-redirects", "title": "Bank redirects | Stripe Documentation", "accessed": "2026-11-17"}]
faq: [{"q": "Does Stripe support FPX in Malaysia?", "a": "Yes. Stripe lists FPX for businesses located in Malaysia at standard pricing of 3% + RM1.00 per successful transaction, and requires a Business Registration Number (BRN). Data as of 17 November 2026."}, {"q": "How long does Stripe take to settle FPX payments?", "a": "Stripe's FPX documentation states that FPX settlement takes up to 5 business days (T+5)."}, {"q": "Can students pay fees by recurring FPX on Stripe?", "a": "No. Stripe's FPX documentation lists recurring payments as not supported. Each FPX payment is authorised by the payer with their bank."}, {"q": "What does ArusPay include for schools and universities?", "a": "ArusEdu for fee billing, invoices and student records; ArusCampus for students to view invoices, pay by FPX and download receipts; and ArusPay to process the payment and move the money to the institution."}, {"q": "How much does ArusPay cost?", "a": "ArusPay's pricing is not published in this article. Contact the ArusPay team for current terms."}]
draft: false
---

If you manage fees for a Malaysian school, college or university, the ArusPay vs Stripe choice comes down to the problem you need to solve. Stripe is a global payments platform: one integration for cards, wallets and FPX, with published pay-as-you-go pricing. ArusPay is a payment gateway built for Malaysian education, connected to fee billing (ArusEdu) and a student payment portal (ArusCampus).

If your priority is accepting many payment methods from many countries, and you have developers to build the fee workflow, Stripe fits well. If your priority is the whole fee cycle (invoice, student payment, receipt), ArusPay is built around that flow.

This guide compares both using each provider's own published information.

## Why the gateway choice matters on fee day

Fee collection in education is not like online retail. Payments cluster at the start of each semester or term. Amounts are larger than a typical online purchase. Each payment has to match a specific student and a specific invoice, and the bursary team has to reconcile all of it.

In Malaysia, FPX online banking sits at the centre of this. FPX is operated by PayNet with participating Malaysian financial institutions, and customers pay using their own bank credentials ([Stripe FPX documentation](https://docs.stripe.com/payments/fpx)). Stripe says bank redirects such as FPX drive more than half of online commerce in Malaysia ([Stripe, Bank redirects](https://docs.stripe.com/payments/bank-redirects)).

So the useful questions are simple. What does FPX cost? When does the money arrive? How do students find and pay their invoice? And how much of the billing work do you have to build yourself?

## What Stripe offers Malaysian institutions

Stripe is a payments platform used by businesses around the world. On its [Malaysian pricing page](https://stripe.com/en-my/pricing), Stripe lists:

- Standard pricing of 3% + RM1.00 per successful card charge or bank transaction, including FPX, with no setup or monthly fees.
- Domestic cards at 3% + RM1.00, plus 1% for international cards and 2% if currency conversion is required.
- Digital wallets including GrabPay (3%) and Alipay (2.9% + RM1.00).
- Custom pricing for businesses with large payment volume, such as volume discounts and IC+ pricing.

For billing, [Stripe Invoicing](https://stripe.com/en-my/invoicing/pricing) charges 0.4% (Starter) or 0.5% (Plus) per paid invoice, on top of payments pricing. It includes a hosted invoice page, a customer portal and automatic email reminders.

Points from Stripe's [FPX documentation](https://docs.stripe.com/payments/fpx) that matter for fee collection:

- FPX is available to Stripe accounts of businesses located in Malaysia, and a Business Registration Number (BRN) is required.
- FPX settlement takes up to 5 business days (T+5).
- Consumer (B2C) FPX payments range from RM1 to RM30,000 per transaction.
- Recurring payments are not supported with FPX, and Stripe Invoicing supports FPX only with the "send invoice" collection method.
- FPX has no chargeback process, because customers authenticate each payment with their bank.

## What ArusPay offers Malaysian institutions

ArusPay is a Malaysian payments company focused on education. Its products are designed to work together:

- **ArusEdu** gives bursary teams one place to manage student fees, invoices and student records.
- **ArusCampus** lets students see their fees, pay online by FPX and download their receipt.
- **ArusPay** processes the payment and moves the money to the institution.

In short: ArusEdu bills, ArusCampus lets the student pay, ArusPay moves the money. The aim is one connected flow from fee invoice to payment to receipt, built in Malaysia for Malaysian education.

ArusPay's pricing, settlement timing and payment methods beyond FPX are not published in this article. Ask the ArusPay team for current terms.

## ArusPay vs Stripe: side-by-side comparison

| | Stripe | ArusPay |
|---|---|---|
| What it is | Global online payments platform | Payment gateway built for Malaysian education |
| Payment methods | Cards, FPX, GrabPay, Alipay and 100+ methods globally | FPX online banking (other methods: not published) |
| FPX fee (standard) | 3% + RM1.00 per successful transaction | Not published |
| Domestic card fee (standard) | 3% + RM1.00; +1% international cards; +2% if currency conversion | Not published |
| Setup and monthly fees | None on standard pricing | Not published |
| FPX settlement | Up to 5 business days (T+5) | Not published |
| FPX amount per consumer payment | RM1 to RM30,000 | Not published |
| Recurring FPX payments | Not supported | Not published |
| Fee billing | Stripe Invoicing: 0.4% or 0.5% per paid invoice, on top of payments pricing | ArusEdu: student fees, invoicing and student records |
| Student payment page | Hosted invoice page and customer portal | ArusCampus: view invoices, pay by FPX, download receipts |

Data as of 17 November 2026. Check the provider's site for current terms. Stripe figures are standard published pricing from [Stripe pricing](https://stripe.com/en-my/pricing), [Stripe Invoicing pricing](https://stripe.com/en-my/invoicing/pricing) and [Stripe FPX documentation](https://docs.stripe.com/payments/fpx); Stripe also offers custom pricing.

## When Stripe fits

- You collect from many international students or parents who pay by card in other currencies. Stripe publishes its international card and currency conversion rates and supports 135+ currencies ([Stripe pricing](https://stripe.com/en-my/pricing)).
- You want wallets such as GrabPay or Alipay alongside FPX.
- You already run a student information system and have a development team that can build invoices, payment matching and receipts on Stripe's APIs.
- You need one payments provider across several countries.

## When ArusPay fits

- Your bursary team wants fee billing, student payment and receipts in one connected flow, rather than building that flow itself.
- Most of your students pay in ringgit by FPX online banking.
- You want products designed around education fees: invoices tied to students, a student portal and downloadable receipts.
- You prefer a provider built in Malaysia for Malaysian education.

## Checklist: questions to ask any payment provider

Before you sign with any provider, get written answers to these:

1. What is the fee per FPX payment, and per card payment (domestic and international)?
2. When does the money reach our bank account after an FPX payment?
3. What is the maximum amount per FPX payment, and does it cover our largest fee?
4. How is each payment matched to a student and an invoice?
5. Do students get a receipt automatically?
6. Can we offer instalments, and how is each instalment paid?
7. How are refunds handled, and how long do they take?
8. What reports does the bursary get for reconciliation and audit?
9. How much development work do we need, and who maintains it?
10. Who do we call on fee day if something goes wrong?

Compare the answers against your own fee schedule and payment peaks, not against a generic online shop.

## The bottom line

Both providers can collect FPX payments from Malaysian students. Stripe gives you a global, developer-oriented toolkit with published standard pricing. ArusPay gives you an education-specific flow from fee invoice to payment to receipt. Choose based on your fee cycle, your students and the team you have to run it.

To see how the ArusPay flow fits your fee cycle, visit [aruspay.com.my](https://aruspay.com.my/) or read more on the [ArusPay blog](https://aruspay.com.my/blog/).

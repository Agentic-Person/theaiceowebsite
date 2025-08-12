'use client';

import Container from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Resource } from '@/types';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerReveal from '@/components/animations/StaggerReveal';

const leadMagnetFeatures = [
  "20+ real AI use cases for your industry",
  "ROI calculator worksheet",
  "Implementation timeline template", 
  "Security checklist",
  "Questions to ask any AI vendor",
  "Budget planning framework"
];

const freeResources: Resource[] = [
  {
    title: "Industry AI Use Cases",
    description: "Specific examples of AI implementations in your sector",
    type: "guide"
  },
  {
    title: "ROI Calculators", 
    description: "Calculate the potential return on AI investments",
    type: "calculator"
  },
  {
    title: "Implementation Templates",
    description: "Ready-to-use templates for planning your AI rollout",
    type: "template"
  },
  {
    title: "AI Security Best Practices",
    description: "Protect your business while implementing AI solutions",
    type: "guide"
  }
];

export default function ResourcesSection() {
  return null;
}
// app/head.js (Server Component)
import { Metadata } from 'next/server';

export default function Head({ title, description, ...rest }) { // Accept title and description as props
    return null; // No visible output from this component
}

export async function generateMetadata() {
    return {
        title: "Real Estate Analyzer",
        description: "Analyze properties with Attom and Gemini",
        // ... other metadata
    }
}
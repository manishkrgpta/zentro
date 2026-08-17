/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { projectsData, testimonialsData, pricingPackagesData } from '../data';
import { Project } from '../types';

interface PortfolioViewProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export default function PortfolioView({ selectedProject, setSelectedProject }: PortfolioViewProps) {
  void selectedProject;
  void setSelectedProject;

  const workExamples = projectsData.slice(0, 4);
  const clientReviews = testimonialsData.slice(0, 3);
  const selectedPackages = pricingPackagesData.slice(0, 3);

  return (
    <div className="relative w-full pt-28 pb-20 bg-white" id="zentro-portfolio-view-container">
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-violet-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-fuchsia-200/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16" id="portfolio-work-section">
          {workExamples.map((project) => (
            <article key={project.id} className="bg-white border border-slate-200 rounded-3xl p-6 transition hover:border-violet-300 hover:shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-600">{project.category}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Verified</span>
              </div>
              <h2 className="text-slate-900 text-2xl font-semibold leading-snug">{project.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">{project.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <p className="font-semibold text-slate-700">Outcome</p>
                  <p className="mt-1">{project.metrics.value}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <p className="font-semibold text-slate-700">Tech</p>
                  <p className="mt-1">{project.stack.slice(0, 3).join(', ')}</p>
                </div>
              </div>
              <div className="mt-5 text-slate-600 text-sm space-y-2">
                {project.details.results.slice(0, 2).map((result, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-violet-500">•</span>
                    <span>{result}</span>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mb-16" id="portfolio-client-reviews">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-violet-600 uppercase tracking-widest font-bold">Client Feedback</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight mt-2">Verified Reviews from Trusted Partners</h2>
            </div>
            <p className="max-w-xl text-slate-500 text-sm leading-relaxed">High-impact partnerships across fintech, healthcare, and automation brands.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((review) => (
              <div key={review.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-violet-200 transition">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                    <p className="text-[11px] text-slate-400">{review.role}, {review.company}</p>
                  </div>
                  <div className="bg-violet-100 text-violet-700 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold">{review.rating}★</div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16" id="portfolio-service-pricing">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-violet-600 uppercase tracking-widest font-bold">Service Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight mt-2">Services + Price in One Section</h2>
            </div>
            <p className="max-w-xl text-slate-500 text-sm leading-relaxed">A mixed portfolio view that pairs service scope, price transparency, and real package outcomes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedPackages.map((pkg) => (
              <div key={pkg.name} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-violet-300 transition">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-600">{pkg.name}</span>
                  <span className="text-sm font-semibold text-slate-900">{pkg.price}</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">{pkg.description}</p>
                <div className="mt-5 text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Included scope</div>
                <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-500">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
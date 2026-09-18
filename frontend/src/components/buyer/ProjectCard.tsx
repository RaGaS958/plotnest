import React from 'react';
import { Project } from '../../types';
import { StatusBadge, VerificationBadge } from '../common/StatusBadge';
import { MapPin, Star, Layers, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (projectId: string) => void;
  onOpenSitePlan: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  onOpenSitePlan
}) => {
  return (
    <div
      id={`project-card-${project.id}`}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
    >
      {/* Image container with badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={project.images[0]?.replace('w=1200', 'w=600') || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <VerificationBadge label={project.reraInfo ? 'RERA Approved' : 'Verified'} />
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-xs font-bold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{project.rating}</span>
          </div>
        </div>

        {/* Bottom overlay in image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block">
            {project.locality}, {project.city}
          </span>
          <h3 className="text-lg font-bold drop-shadow-sm truncate">{project.name}</h3>
        </div>
      </div>

      {/* Content info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Price & Inventory row */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-500">Starting from</span>
            <div className="text-xl font-black text-slate-900">
              ₹{(project.priceFrom / 100000).toFixed(1)}L – ₹{(project.priceTo / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">Available Plots</span>
            <div className="text-sm font-bold text-emerald-800 flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{project.availableCount} / {project.plotCount}</span>
            </div>
          </div>
        </div>

        {/* Development stage & highlights */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Stage</span>
            <span className="font-semibold text-slate-800">{project.developmentStage}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Possession</span>
            <span className="font-semibold text-slate-800">{project.possession}</span>
          </div>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5">
          {project.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
              {amenity}
            </span>
          ))}
          {project.amenities.length > 3 && (
            <span className="text-[11px] text-slate-400 px-1 py-0.5 font-medium">
              +{project.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenSitePlan(project.id)}
            className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Layout</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(project.id)}
            className="py-2.5 px-3 bg-[#14532D] hover:bg-[#0F4022] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

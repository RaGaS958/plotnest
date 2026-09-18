import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plot, Project } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Search, Filter, Edit, Check, X, ShieldAlert, Layers, ArrowLeft } from 'lucide-react';

export const DeveloperInventory: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { plots, projects, updatePlotStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Editing modal state
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [newStatus, setNewStatus] = useState<Plot['status']>('AVAILABLE');

  const filteredPlots = plots.filter(p => {
    if (selectedProject && p.projectId !== selectedProject) return false;
    if (selectedStatus && p.status !== selectedStatus) return false;
    if (searchQuery && !p.plotNo.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSavePlotStatus = () => {
    if (!editingPlot) return;
    updatePlotStatus(editingPlot.id, newStatus);
    setEditingPlot(null);
  };

  return (
    <div id="developer-inventory-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Console</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900">Inventory &amp; Plot Control</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage unit availability, manual blocking, and price attributes. Changes update customer site plans in real-time.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            id="inventory-search-input"
            type="text"
            placeholder="Search by plot number (e.g. A-02, B-01)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-[#14532D]"
          />
        </div>

        {/* Project selector */}
        <select
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
          className="w-full md:w-56 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
        >
          <option value="">All Projects</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Status selector */}
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="w-full md:w-44 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
        >
          <option value="">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="BOOKED">Booked</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>

      {/* Plot Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Plot No</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Area &amp; Dimensions</th>
                <th className="py-3.5 px-4">Facing &amp; Road</th>
                <th className="py-3.5 px-4">Attributes</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlots.map(plot => {
                const prj = projects.find(p => p.id === plot.projectId);
                return (
                  <tr key={plot.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-900 text-sm">
                      {plot.plotNo}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {prj?.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div><strong>{plot.areaSqFt}</strong> sq.ft.</div>
                      <div className="text-[10px] text-slate-400">{plot.dimensions}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{plot.facing}</div>
                      <div className="text-[10px] text-slate-400">{plot.roadWidthFt} ft road</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {plot.corner && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Corner
                          </span>
                        )}
                        {plot.parkFacing && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                            Park
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">
                        ₹{(plot.price / 100000).toFixed(2)}L
                      </div>
                      <div className="text-[10px] text-slate-500">
                        ₹{plot.pricePerSqFt}/sqft
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={plot.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPlot(plot);
                          setNewStatus(plot.status);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-semibold rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Update</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredPlots.length} plot records</span>
          <span>Click "Update" to modify live status for any unit</span>
        </div>
      </div>

      {/* Status Edit Modal */}
      {editingPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900">
              Update Status: Plot {editingPlot.plotNo}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select the new inventory availability status for this unit.
            </p>

            <div className="mt-4 space-y-2">
              {(['AVAILABLE', 'ON_HOLD', 'BOOKED', 'BLOCKED'] as Plot['status'][]).map(st => (
                <label
                  key={st}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    newStatus === st
                      ? 'border-[#14532D] bg-emerald-50 text-emerald-900 ring-1 ring-[#14532D]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <StatusBadge status={st} size="sm" />
                  </div>
                  <input
                    type="radio"
                    name="plot-status-opt"
                    checked={newStatus === st}
                    onChange={() => setNewStatus(st)}
                    className="text-[#14532D]"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPlot(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                id="save-plot-status-btn"
                type="button"
                onClick={handleSavePlotStatus}
                className="px-5 py-2 bg-[#14532D] hover:bg-[#0F4022] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

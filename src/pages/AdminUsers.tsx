import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppUser, UserRole, UserStatus } from '../types';
import {
  ShieldAlert,
  UserCheck,
  Lock,
  Unlock,
  Trash2,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Award,
  Store,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const AdminUsers: React.FC = () => {
  const {
    users,
    currentUser,
    updateUserStatus,
    deleteUser,
    showNotification,
    products,
    orders,
    youthSupporters
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(u => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchPhone = u.phone.toLowerCase().includes(q);
      const matchExtra = (u.gardenName || u.unit || u.address || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchExtra) return false;
    }
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    return true;
  });

  const getRoleTag = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Tag value="🔴 Quản Trị Viên (Admin)" severity="danger" className="text-xs font-bold" />;
      case 'youth':
        return <Tag value="🔵 Thanh Niên Số (Đoàn)" severity="info" className="text-xs font-bold" />;
      case 'farmer':
        return <Tag value="🟢 Chủ Nhà Vườn" severity="success" className="text-xs font-bold" />;
      case 'buyer':
        return <Tag value="🟠 Người Mua (Khách)" severity="warning" className="text-xs font-bold" />;
    }
  };

  const getStatusTag = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return <Tag value="✓ Đang Hoạt Động" severity="success" className="text-xs font-bold" />;
      case 'pending':
        return <Tag value="⏳ Chờ Phê Duyệt" severity="warning" className="text-xs font-bold animate-pulse" />;
      case 'locked':
        return <Tag value="⛔ Đã Bị Khóa" severity="danger" className="text-xs font-bold" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Admin */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-800 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-sun" />
            <span>TRANG QUẢN TRỊ HỆ THỐNG PHÂN QUYỀN RBAC (ADMIN)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Quản Lý & Phê Duyệt Tài Khoản Toàn Sàn
          </h1>
          <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl">
            Kiểm duyệt đăng ký mới của Nhà vườn và Đoàn viên thanh niên, quản lý khóa / mở khóa và phân quyền theo Role-Based Access Control.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur p-4 rounded-2xl border border-white/20 text-xs space-y-1.5 min-w-[200px]">
          <div className="flex justify-between">
            <span className="text-red-200">Tổng tài khoản:</span>
            <strong className="text-white text-sm">{users.length}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-300">Chờ duyệt mới:</span>
            <strong className="text-amber-300 text-sm font-black">
              {users.filter(u => u.status === 'pending').length}
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-green-300">Đang hoạt động:</span>
            <strong className="text-green-300 text-sm">
              {users.filter(u => u.status === 'active').length}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-green-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Tìm theo tên, SĐT, nhà vườn hoặc đơn vị Đoàn..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-green-700 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="text-xs p-2.5 rounded-xl border border-gray-300 bg-white font-bold text-gray-700 outline-none"
            >
              <option value="all">Tất cả vai trò ({users.length})</option>
              <option value="admin">Quản trị viên (Admin)</option>
              <option value="youth">Thanh niên số</option>
              <option value="farmer">Chủ nhà vườn</option>
              <option value="buyer">Người mua (Khách)</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs p-2.5 rounded-xl border border-gray-300 bg-white font-bold text-gray-700 outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">⏳ Chờ duyệt ({users.filter(u => u.status === 'pending').length})</option>
              <option value="active">✓ Đang hoạt động</option>
              <option value="locked">⛔ Đã khóa</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-cream text-green-950 font-black border-b border-green-200">
                <th className="p-3.5 rounded-l-xl">Họ tên & Người dùng</th>
                <th className="p-3.5">Số điện thoại</th>
                <th className="p-3.5">Vai trò (Role)</th>
                <th className="p-3.5">Thông tin chi tiết theo vai trò</th>
                <th className="p-3.5 text-center">Trạng thái</th>
                <th className="p-3.5 text-right rounded-r-xl">Hành động quản trị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition">
                  {/* Name */}
                  <td className="p-3.5 font-bold text-ink">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-black flex items-center justify-center text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block text-ink">{u.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {u.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="p-3.5 font-mono text-gray-700 font-semibold">
                    {u.phone}
                  </td>

                  {/* Role */}
                  <td className="p-3.5">
                    {getRoleTag(u.role)}
                  </td>

                  {/* Detail */}
                  <td className="p-3.5 text-xs text-gray-600 max-w-xs">
                    {u.role === 'farmer' && (
                      <div>
                        <strong>Vườn:</strong> {u.gardenName || 'Chưa cập nhật'} • {u.gardenArea}
                        <br />
                        <span className="text-[11px] text-gray-500">📍 {u.address}</span>
                      </div>
                    )}
                    {u.role === 'youth' && (
                      <div>
                        <strong>Đoàn:</strong> {u.unit || 'Chưa cập nhật'}
                        <br />
                        <span className="text-[11px] text-green-800">🛠️ {u.skills}</span>
                      </div>
                    )}
                    {u.role === 'buyer' && (
                      <div>
                        <span>📍 Địa chỉ: {u.address || 'TP. Hồ Chí Minh'}</span>
                      </div>
                    )}
                    {u.role === 'admin' && (
                      <span className="text-red-700 font-bold">Toàn quyền hệ thống</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-3.5 text-center">
                    {getStatusTag(u.status)}
                  </td>

                  {/* Actions: Duyệt, Khóa, Mở khóa, Xóa */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Duyệt tài khoản pending */}
                      {u.status === 'pending' && (
                        <button
                          onClick={() => updateUserStatus(u.id, 'active')}
                          className="px-2.5 py-1 rounded-lg bg-green-700 hover:bg-green-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                          title="Phê duyệt tài khoản"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Duyệt</span>
                        </button>
                      )}

                      {/* Khóa / Mở khóa */}
                      {u.role !== 'admin' && (
                        <>
                          {u.status === 'active' ? (
                            <button
                              onClick={() => updateUserStatus(u.id, 'locked')}
                              className="px-2 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs flex items-center gap-1"
                              title="Khóa tài khoản"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Khóa</span>
                            </button>
                          ) : u.status === 'locked' ? (
                            <button
                              onClick={() => updateUserStatus(u.id, 'active')}
                              className="px-2 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-800 font-bold text-xs flex items-center gap-1"
                              title="Mở khóa tài khoản"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Mở</span>
                            </button>
                          ) : null}

                          <button
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${u.name}"?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1 rounded-lg text-gray-400 hover:text-red-600 transition"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

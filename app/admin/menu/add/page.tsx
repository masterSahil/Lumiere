'use client'
import AddMenu from '@/component/admin/menu/addMenu'

export default function AdminAddMenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Add Menu Item</h1>
      </div>
      <AddMenu />
    </div>
  )
}

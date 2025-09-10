"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Grid3X3, LayoutGrid } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Card,
  CardBody,
  Skeleton,
} from "@heroui/react";
import { IconSearch, IconFilter, IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import Masonry from "@/components/ui/masonry";
import { getPhotos, deletePhoto } from "./helpers";
import { RequirePermission, PERMISSIONS } from "@/lib/permissions";

interface Photo {
  id: number;
  image_url: string;
  caption: string;
  created_at?: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const fetchedPhotos = await getPhotos();
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter photos based on search
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo =>
      photo.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    );
  }, [photos, searchTerm]);

  const handleDelete = async (id: number) => {
    setSelectedPhotoId(id);
    onDeleteModalOpen();
  };

  const confirmDelete = async () => {
    if (selectedPhotoId) {
      setIsDeleting(true);
      const success = await deletePhoto(selectedPhotoId);
      if (success) {
        await fetchPhotos();
      }
      setIsDeleting(false);
      onDeleteModalClose();
      setSelectedPhotoId(null);
    }
  };

  // Transform photos to masonry format
  const masonryItems = filteredPhotos.map(photo => ({
    id: photo.id.toString(),
    img: photo.image_url,
    height: 600 + Math.random() * 400, // Random height for masonry effect
    caption: photo.caption || 'Untitled Photo'
  }));

  const handleItemClick = () => {
    // For masonry view, clicking just for preview
    // Edit actions are handled by the masonry component's built-in buttons
  };

  const MasonrySkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="relative">
          <Skeleton
            className="w-full rounded-lg"
            style={{ height: `${200 + Math.random() * 200}px` }}
          />
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <RequirePermission permission={PERMISSIONS.PHOTOS}>
        <div className="min-h-screen w-full">
          {/* Header Skeleton */}
          <section className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
              <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <Skeleton className="h-12 w-64 mx-auto mb-4" />
                  <Skeleton className="h-6 w-96 mx-auto" />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center mb-8">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-40" />
                  <Skeleton className="h-12 w-40" />
                </div>
              </Card>
            </div>
          </section>

          {/* Gallery Skeleton */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-6 w-32" />
              </div>
              <MasonrySkeleton />
            </div>
          </section>
        </div>
      </RequirePermission>
    );
  }

  return (
    <RequirePermission permission={PERMISSIONS.PHOTOS}>
      <div className="min-h-screen w-full">
        {/* Search and Filter Controls */}
        <section className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Photo Gallery
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Manage and showcase your organization&apos;s memorable moments
                </p>
              </div>

              {/* Search and View Toggle */}
              <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center mb-8">
                <div className="flex-1">
                  <Input
                    placeholder="Search photos by caption..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<IconSearch className="w-5 h-5 text-gray-400" />}
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "shadow-sm border border-gray-200 bg-gray-50"
                    }}
                  />
                </div>

                <Button
                  variant={viewMode === 'grid' ? 'solid' : 'bordered'}
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                  size="lg"
                  onPress={() => setViewMode(viewMode === 'masonry' ? 'grid' : 'masonry')}
                  startContent={viewMode === 'masonry' ? <Grid3X3 className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                  className={viewMode === 'grid' ? 'bg-abc-blue text-white' : ''}
                >
                  {viewMode === 'masonry' ? 'Grid View' : 'Masonry View'}
                </Button>

                <Button
                  as={Link}
                  href="/photos/create"
                  color="primary"
                  size="lg"
                  startContent={<Plus className="w-5 h-5" />}
                  className="bg-abc-blue text-white font-semibold hover:bg-abc-gold"
                >
                  Add New Photo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Gallery Photos
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IconFilter className="w-5 h-5" />
                    <span className="font-medium">
                      {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                </div>
                {searchTerm && (
                  <p className="text-gray-500 mt-2">
                    Showing results for &quot;{searchTerm}&quot;
                  </p>
                )}
              </div>

              {/* Photos Display */}
              {filteredPhotos.length > 0 ? (
                viewMode === 'masonry' ? (
                  <div className="relative">
                    <Masonry
                      items={masonryItems}
                      scaleOnHover={true}
                      hoverScale={0.98}
                      blurToFocus={true}
                      animateFrom="bottom"
                      duration={0.8}
                      stagger={0.08}
                      ease="power3.out"
                      onItemClick={handleItemClick}
                    />

                    {/* Admin Actions Overlay for Masonry */}
                    <style jsx global>{`
                      .masonry-item {
                        position: relative;
                      }
                      .masonry-item:hover .admin-actions {
                        opacity: 1;
                      }
                      .admin-actions {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        display: flex;
                        gap: 8px;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        z-index: 10;
                      }
                    `}</style>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="relative group"
                      >
                        <Card className="h-full w-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={photo.image_url}
                              alt={photo.caption || "Photo"}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Admin Actions Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                color="default"
                                variant="flat"
                                className="bg-white/90 backdrop-blur-sm shadow-md"
                                onPress={() => window.open(photo.image_url, '_blank')}
                              >
                                <IconEye size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                color="primary"
                                variant="flat"
                                className="bg-white/90 backdrop-blur-sm shadow-md"
                                as={Link}
                                href={`/photos/edit/${photo.id}`}
                              >
                                <IconEdit size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="flat"
                                className="bg-white/90 backdrop-blur-sm shadow-md"
                                onPress={() => handleDelete(photo.id)}
                              >
                                <IconTrash size={16} />
                              </Button>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <CardBody className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {photo.caption || "Untitled Photo"}
                            </h3>
                            {photo.created_at && (
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(photo.created_at).toLocaleDateString()}
                              </p>
                            )}
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="max-w-md mx-auto">
                    <IconFilter className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-4">No photos found</h3>
                    <p className="text-gray-500 mb-8">
                      {searchTerm
                        ? "We couldn't find any photos matching your search criteria. Try adjusting your search terms."
                        : "Your gallery is empty. Start by adding some photos to showcase your organization's activities."
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {searchTerm && (
                        <Button
                          color="primary"
                          variant="bordered"
                          onPress={() => setSearchTerm('')}
                          className="font-medium"
                        >
                          Clear Search
                        </Button>
                      )}
                      <Button
                        as={Link}
                        href="/photos/create"
                        color="primary"
                        className="bg-abc-blue text-white font-medium"
                        startContent={<Plus className="w-4 h-4" />}
                      >
                        Add First Photo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
          <ModalContent>
            <ModalHeader>Delete Photo</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this photo?</p>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteModalClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={confirmDelete}
                isLoading={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Photo'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </RequirePermission>
  );
}

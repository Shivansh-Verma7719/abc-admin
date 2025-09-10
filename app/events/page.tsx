"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Grid } from "lucide-react";
import { Button, Input, Chip, Card, CardBody, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { IconSearch, IconCalendar, IconFilter, IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import CompactEventCard from "@/components/CompactEventCard";
import Link from "next/link";
import { RequirePermission, PERMISSIONS } from "@/lib/permissions";
import getEvents, { Event } from "@/app/events";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setEvents(res);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(events.map(event => event.category)));
    return ['all', ...uniqueCategories];
  }, [events]);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.one_liner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event);
    onDeleteModalOpen();
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      // TODO: Implement delete functionality
      console.log('Deleting event:', eventToDelete.id);
      onDeleteModalClose();
      setEventToDelete(null);
    }
  };

  const EventSkeleton = () => (
    <Card className="h-full w-full">
      <div className="p-0 relative">
        <Skeleton className="w-full h-48 rounded-t-lg" />
      </div>
      <CardBody className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <Skeleton className="h-10 w-full" />
      </CardBody>
    </Card>
  );

  if (loading) {
    return (
      <RequirePermission permission={PERMISSIONS.EVENTS}>
        <div className="min-h-screen w-full">
          {/* Search and Filter Controls */}
          <section className="pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
              <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <Skeleton className="h-10 w-48 mx-auto mb-4" />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center mb-8">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-40" />
                  <Skeleton className="h-12 w-40" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-8 w-20" />
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* Events Grid Skeleton */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <EventSkeleton key={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </RequirePermission>
    );
  }

  return (
    <RequirePermission permission={PERMISSIONS.EVENTS}>
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
                  Manage Events
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Create, edit, and manage all your events in one place
                </p>
              </div>

              {/* Search and View Toggle */}
              <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center mb-8">
                <div className="flex-1">
                  <Input
                    placeholder="Search events by name, description, or keywords..."
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
                  variant={viewMode === 'list' ? 'solid' : 'bordered'}
                  color={viewMode === 'list' ? 'primary' : 'default'}
                  size="lg"
                  onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  startContent={viewMode === 'grid' ? <IconCalendar className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                  className={viewMode === 'list' ? 'bg-abc-blue text-white' : ''}
                >
                  {viewMode === 'grid' ? 'List View' : 'Grid View'}
                </Button>

                <Button
                  as={Link}
                  href="/events/create"
                  color="primary"
                  size="lg"
                  startContent={<Plus className="w-5 h-5" />}
                  className="bg-abc-blue text-white font-semibold hover:bg-abc-gold"
                >
                  Add New Event
                </Button>
              </div>

              {/* Category Filters */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Filter by category:</p>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      variant={selectedCategory === category ? 'solid' : 'bordered'}
                      color={selectedCategory === category ? 'primary' : 'default'}
                      size="lg"
                      className={`cursor-pointer capitalize transition-all duration-200 ${selectedCategory === category
                          ? 'bg-abc-blue text-white shadow-lg scale-105'
                          : 'hover:border-abc-blue hover:text-abc-blue'
                        }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      {selectedCategory === category && (
                        <span className="ml-1 text-xs opacity-80">
                          ({category === 'all' ? events.length : events.filter(e => e.category === category).length})
                        </span>
                      )}
                    </Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Events Content */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Events' : `${selectedCategory} Events`}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IconFilter className="w-5 h-5" />
                    <span className="font-medium">
                      {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                </div>
                {searchTerm && (
                  <p className="text-gray-500 mt-2">
                    Showing results for &quot;{searchTerm}&quot;
                  </p>
                )}
              </div>

              {/* Events Grid */}
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      {/* Admin Action Overlay */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          color="default"
                          variant="flat"
                          className="bg-white/90 backdrop-blur-sm shadow-md"
                          as={Link}
                          href={`/events/${event.id}`}
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
                          href={`/events/edit/${event.id}`}
                        >
                          <IconEdit size={16} />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="flat"
                          className="bg-white/90 backdrop-blur-sm shadow-md"
                          onPress={() => handleDeleteEvent(event)}
                        >
                          <IconTrash size={16} />
                        </Button>
                      </div>

                      <CompactEventCard
                        event={event}
                        onRegister={() => {
                          window.open(event.register, '_blank');
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="max-w-md mx-auto">
                    <IconFilter className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-4">No events found</h3>
                    <p className="text-gray-500 mb-8">
                      We couldn&apos;t find any events matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        color="primary"
                        variant="bordered"
                        onPress={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                        className="font-medium"
                      >
                        Clear All Filters
                      </Button>
                      <Button
                        as={Link}
                        href="/events/create"
                        color="primary"
                        className="bg-abc-blue text-white font-medium"
                        startContent={<Plus className="w-4 h-4" />}
                      >
                        Create First Event
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
            <ModalHeader>Delete Event</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete &quot;{eventToDelete?.name}&quot;?</p>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteModalClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={confirmDelete}>
                Delete Event
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </RequirePermission>
  );
};

export default EventsPage;

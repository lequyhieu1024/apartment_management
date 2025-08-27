<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {

        Schema::create('buildings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('address');
            $table->bigInteger('owner_user_id')->unsigned();
            $table->bigInteger('plan_id')->unsigned()->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
            $table->index('owner_user_id');
        });

        Schema::create('units', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->string('code');
            $table->integer('floor');
            $table->decimal('area', 6, 2);
            $table->enum('status', ['vacant', 'occupied', 'maintenance'])->default('vacant');
            $table->timestamps();
            $table->index('building_id');
            $table->index('status');
        });

        Schema::create('leases', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('unit_id')->unsigned();
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('tenant_user_id')->unsigned();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('deposit_amount', 12, 2);
            $table->enum('status', ['active', 'ended', 'overdue'])->default('active');
            $table->string('contract_file_url')->nullable();
            $table->timestamps();
            $table->index(['unit_id', 'building_id']);
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('lease_id')->unsigned();
            $table->tinyInteger('period_month');
            $table->smallInteger('period_year');
            $table->dateTime('due_at');
            $table->decimal('total', 12, 2);
            $table->enum('status', ['draft', 'sent', 'paid', 'overdue'])->default('draft');
            $table->string('code')->unique();
            $table->timestamps();
            $table->index(['building_id', 'period_month', 'period_year']);
            $table->index('code');
        });

        Schema::create('invoice_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('invoice_id')->unsigned();
            $table->string('name');
            $table->decimal('qty', 12, 3);
            $table->decimal('unit_price', 12, 2);
            $table->decimal('amount', 12, 2);
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->index('invoice_id');
        });

        Schema::create('meters', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('unit_id')->unsigned();
            $table->enum('type', ['electric', 'water']);
            $table->string('number');
            $table->timestamps();
            $table->index(['building_id', 'unit_id']);
        });

        Schema::create('meter_readings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('meter_id')->unsigned();
            $table->decimal('reading', 12, 3);
            $table->string('photo_url')->nullable();
            $table->tinyInteger('period_month');
            $table->smallInteger('period_year');
            $table->dateTime('read_at');
            $table->bigInteger('read_by_user_id')->unsigned();
            $table->timestamps();
            $table->index(['meter_id', 'period_month', 'period_year']);
        });

        Schema::create('tickets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('unit_id')->unsigned();
            $table->bigInteger('created_by')->unsigned();
            $table->bigInteger('assigned_to')->unsigned()->nullable();
            $table->string('category');
            $table->text('content');
            $table->enum('status', ['open', 'in_progress', 'done'])->default('open');
            $table->enum('priority', ['low', 'med', 'high'])->default('low');
            $table->timestamps();
            $table->index(['building_id', 'unit_id']);
        });

        Schema::create('announcements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->string('title');
            $table->text('content');
            $table->json('scope')->nullable();
            $table->dateTime('published_at');
            $table->timestamps();
            $table->foreign('building_id')->references('id')->on('buildings')->onDelete('cascade');
            $table->index('building_id');
        });

        Schema::create('market_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('seller_user_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 12, 2)->nullable();
            $table->enum('type', ['sell', 'give', 'trade', 'lend'])->default('sell');
            $table->integer('qty');
            $table->enum('status', ['pending', 'active', 'sold', 'hidden'])->default('pending');
            $table->json('images')->nullable();
            $table->timestamps();
            $table->foreign('building_id')->references('id')->on('buildings')->onDelete('cascade');
            $table->foreign('seller_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('building_id');
            $table->fullText(['title', 'description']);
        });

        Schema::create('market_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('item_id')->unsigned();
            $table->bigInteger('buyer_user_id')->unsigned();
            $table->bigInteger('seller_user_id')->unsigned();
            $table->integer('qty');
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['created', 'confirmed', 'completed', 'cancelled'])->default('created');
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('market_items')->onDelete('cascade');
            $table->foreign('buyer_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('seller_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['item_id', 'buyer_user_id']);
        });

        Schema::create('fees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->string('name');
            $table->enum('calc_method', ['fixed', 'per_m3', 'per_kwh', 'per_person'])->default('fixed');
            $table->decimal('price', 12, 3);
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->index('building_id');
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->bigInteger('invoice_id')->unsigned()->nullable();
            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->enum('provider', ['sepay']);
            $table->string('txn_id')->unique();
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->json('raw')->nullable();
            $table->string('idempotency_key')->unique()->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->timestamps();
            $table->index(['building_id', 'txn_id']);
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('building_id')->unsigned();
            $table->string('action');
            $table->string('entity');
            $table->bigInteger('entity_id');
            $table->json('before')->nullable();
            $table->json('after')->nullable();
            $table->timestamp('created_at');
            $table->index(['user_id', 'building_id', 'entity', 'entity_id']);
        });

        Schema::create('chats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('building_id')->unsigned();
            $table->string('subject_type');
            $table->bigInteger('subject_id');
            $table->timestamps();
            $table->index(['building_id', 'subject_type', 'subject_id']);
        });

        Schema::create('chat_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('chat_id')->unsigned();
            $table->bigInteger('sender_user_id')->unsigned();
            $table->text('message');
            $table->json('attachments')->nullable();
            $table->timestamps();
            $table->index('chat_id');
        });

        Schema::create('market_offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('item_id')->unsigned();
            $table->bigInteger('buyer_user_id')->unsigned();
            $table->decimal('price_offer', 12, 2)->nullable();
            $table->enum('status', ['open', 'accepted', 'rejected', 'cancelled'])->default('open');
            $table->timestamps();
            $table->index(['item_id', 'buyer_user_id']);
        });

        Schema::create('announcement_reads', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('announcement_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->dateTime('read_at');
            $table->timestamps();
            $table->foreign('announcement_id')->references('id')->on('announcements')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['announcement_id', 'user_id']);
        });

        Schema::create('plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->json('features')->nullable();
            $table->decimal('price_month', 12, 2);
            $table->decimal('price_year', 12, 2);
            $table->timestamps();
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcement_reads');
        Schema::dropIfExists('market_offers');
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chats');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('fees');
        Schema::dropIfExists('user_roles');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('market_orders');
        Schema::dropIfExists('market_items');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('meter_readings');
        Schema::dropIfExists('meters');
        Schema::dropIfExists('invoice_items');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('leases');
        Schema::dropIfExists('units');
        Schema::dropIfExists('buildings');
        Schema::dropIfExists('plans');
    }
};
